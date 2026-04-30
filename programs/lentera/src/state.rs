use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct GameState {
    pub authority: Pubkey,
    pub token_mint: Pubkey,
    pub rewards_vault: Pubkey,
    pub total_players: u32,
    pub total_rewards_distributed: u64,
    pub bump: u8,
}

impl GameState {
    pub fn xp_to_next_level(&self, level: u32) -> u64 {
        100 * (level as u64).pow(2)
    }
}

#[account]
#[derive(InitSpace)]
pub struct Player {
    pub authority: Pubkey,
    pub username: String,
    pub level: u32,
    pub xp: u64,
    pub tokens: u64,
    pub streak: u32,
    pub longest_streak: u32,
    pub guardians: Vec<Guardian>,
    pub achievements: Vec<Achievement>,
    pub last_played_at: i64,
    pub created_at: i64,
    pub bump: u8,
}

impl Player {
    pub fn xp_to_next_level(&self) -> u64 {
        100 * (self.level as u64).pow(2)
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Guardian {
    pub id: u8,
    pub name: String,
    pub level: u32,
    pub experience: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Achievement {
    pub id: String,
    pub unlocked_at: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Guild {
    pub name: String,
    pub university: String,
    pub members: Vec<Pubkey>,
    pub total_points: u64,
    pub rank: u32,
}