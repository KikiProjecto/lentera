use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};
use anchor_spl::associated_token::AssociatedToken;

#[derive(Accounts)]
pub struct InitializeGameState<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + GameState::INIT_SPACE,
        seeds = [b"game_state"],
        bump
    )]
    pub game_state: Account<'info, GameState>,
    #[account(
        init,
        payer = authority,
        mint::authority = game_state,
        mint::decimals = 6,
        seeds = [b"token_mint"],
        bump
    )]
    pub token_mint: Account<'info, Mint>,
    #[account(
        init,
        payer = authority,
        token::mint = token_mint,
        token::authority = game_state,
        seeds = [b"rewards_vault"],
        bump
    )]
    pub rewards_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, anchor_spl::token::Token>,
}

#[derive(Accounts)]
pub struct InitializePlayer<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Player::INIT_SPACE,
        seeds = [b"player", authority.key().as_ref()],
        bump
    )]
    pub player: Account<'info, Player>,
    #[account(mut)]
    pub game_state: Account<'info, GameState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimReward<'info> {
    #[account(mut)]
    pub player: Account<'info, Player>,
    #[account(mut)]
    pub game_state: Account<'info, GameState>,
    #[account(mut)]
    pub rewards_vault: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = token_mint,
        associated_token::authority = authority,
        seeds = [b"player_token", authority.key().as_ref()],
        bump
    )]
    pub player_token_account: Account<'info, TokenAccount>,
    pub token_mint: Account<'info, Mint>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, anchor_spl::token::Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

#[derive(Accounts)]
pub struct AddXp<'info> {
    #[account(mut)]
    pub player: Account<'info, Player>,
}

#[derive(Accounts)]
pub struct UpdateStreak<'info> {
    #[account(mut)]
    pub player: Account<'info, Player>,
}

#[derive(Accounts)]
pub struct MintGuardianNft<'info> {
    #[account(mut)]
    pub player: Account<'info, Player>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UnlockAchievement<'info> {
    #[account(mut)]
    pub player: Account<'info, Player>,
    #[account(mut)]
    pub authority: Signer<'info>,
}