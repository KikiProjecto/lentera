use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use anchor_spl::associated_token::AssociatedToken;
use std::str::FromStr;

mod state;
mod instructions;

pub use state::*;
pub use instructions::*;

declare_id!("Lentera1111111111111111111111111111111");

pub const LENTERA_TOKEN_MINT: &str = "LENTa111111111111111111111111111111111";
pub const LENTERA_TOKEN_DECIMALS: u8 = 6;
pub const MAX_GUARDIANS: usize = 5;
pub const MAX_ACHIEVEMENTS: usize = 20;

#[program]
pub mod lentera {
    use super::*;

    pub fn initialize_game_state(ctx: Context<InitializeGameState>) -> Result<()> {
        ctx.accounts.game_state.authority = ctx.accounts.authority.key();
        ctx.accounts.game_state.token_mint = ctx.accounts.token_mint.key();
        ctx.accounts.game_state.rewards_vault = ctx.accounts.rewards_vault.key();
        ctx.accounts.game_state.total_players = 0;
        ctx.accounts.game_state.total_rewards_distributed = 0;
        ctx.accounts.game_state.bump = ctx.bumps.game_state;
        Ok(())
    }

    pub fn initialize_player(ctx: Context<InitializePlayer>, username: String) -> Result<()> {
        let player = &mut ctx.accounts.player;
        player.authority = ctx.accounts.authority.key();
        player.username = username;
        player.level = 1;
        player.xp = 0;
        player.tokens = 0;
        player.streak = 0;
        player.guardians = Vec::new();
        player.achievements = Vec::new();
        player.created_at = Clock::get()?.unix_timestamp;
        player.bump = ctx.bumps.player;

        ctx.accounts.game_state.total_players = ctx
            .accounts
            .game_state
            .total_players
            .checked_add(1)
            .unwrap();

        Ok(())
    }

    pub fn claim_battle_reward(
        ctx: Context<ClaimReward>,
        amount: u64,
    ) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);
        
        let player = &mut ctx.accounts.player;
        let game_state = &ctx.accounts.game_state;
        
        player.tokens = player.tokens.checked_add(amount).unwrap();
        
        let seeds = &[b"game_state".as_ref(), &[game_state.bump]];
        let signer = &[&[&seeds[..]]];
        
        let cpi_accounts = Transfer {
            from: ctx.accounts.rewards_vault.to_account_info(),
            to: ctx.accounts.player_token_account.to_account_info(),
            authority: game_state.to_account_info(),
        };
        
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                cpi_accounts,
                signer,
            ),
            amount,
        )?;

        ctx.accounts.game_state.total_rewards_distributed = ctx
            .accounts
            .game_state
            .total_rewards_distributed
            .checked_add(amount)
            .unwrap();

        Ok(())
    }

    pub fn add_xp(ctx: Context<AddXp>, amount: u64) -> Result<()> {
        let player = &mut ctx.accounts.player;
        player.xp = player.xp.checked_add(amount).unwrap();
        
        while player.xp >= player.xp_to_next_level() {
            player.xp = player.xp.checked_sub(player.xp_to_next_level()).unwrap();
            player.level = player.level.checked_add(1).unwrap();
        }
        
        Ok(())
    }

    pub fn update_streak(ctx: Context<UpdateStreak>, increment: bool) -> Result<()> {
        let player = &mut ctx.accounts.player;
        
        if increment {
            let last_played = player.last_played_at;
            let now = Clock::get()?.unix_timestamp;
            let day_seconds: i64 = 86400;
            
            if last_played > 0 && now - last_played <= day_seconds {
                player.streak = player.streak.checked_add(1).unwrap();
            } else if now - last_played > day_seconds {
                player.streak = 1;
            }
        } else {
            player.streak = 0;
        }
        
        player.last_played_at = Clock::get()?.unix_timestamp;
        
        if player.streak > player.longest_streak {
            player.longest_streak = player.streak;
        }
        
        Ok(())
    }

    pub fn mint_guardian_nft(
        ctx: Context<MintGuardianNft>,
        guardian_id: u8,
        name: String,
    ) -> Result<()> {
        let player = &mut ctx.accounts.player;
        
        if player.guardians.len() >= MAX_GUARDIANS {
            return Err(ErrorCode::MaxGuardiansReached.into());
        }
        
        player.guardians.push(Guardian {
            id: guardian_id,
            name,
            level: 1,
            experience: 0,
        });
        
        Ok(())
    }

    pub fn unlock_achievement(
        ctx: Context<UnlockAchievement>,
        achievement_id: String,
    ) -> Result<()> {
        let player = &mut ctx.accounts.player;
        
        for achievement in &player.achievements {
            if achievement.id == achievement_id {
                return Err(ErrorCode::AchievementAlreadyUnlocked.into());
            }
        }
        
        player.achievements.push(Achievement {
            id: achievement_id,
            unlocked_at: Clock::get()?.unix_timestamp,
        });
        
        Ok(())
    }
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Max guardians reached")]
    MaxGuardiansReached,
    #[msg("Achievement already unlocked")]
    AchievementAlreadyUnlocked,
    #[msg("Invalid guardian ID")]
    InvalidGuardianId,
    #[msg("Insufficient tokens")]
    InsufficientTokens,
}