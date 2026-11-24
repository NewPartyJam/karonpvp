/**
 * Ranking fixtures.
 *
 * All ranking data shown on the site comes from this module.
 * 現在は手書きの固定データです。後で `getRankings()` を
 * 実データ（Netlify Database など）に差し替えます。
 *
 * ffa.level は FFAティア（1〜10）。1=LT5, 9=LT1, 10=HT1。
 * ffa.kills は表示用で、ティアには影響しません。
 * mace などティアが無いモードは、キーごと書かなければ「なし」になります。
 */

export const SITE = {
 name: 'かろEarth PvP',
  romaji: 'KaroPvP',
  serverIp: 'play.karon.jp',
  discordUrl: 'https://discord.gg/karoasu-bu-an-ding-1142835701977731102',
} as const

export type ModeId = 'sword' | 'mace' | 'netherite' | 'pot' | 'crystal' | 'spear'

export type Mode = { id: ModeId; name: string; jp: string }

export const MODES: Mode[] = [
  { id: 'sword', name: 'Sword', jp: '剣' },
  { id: 'mace', name: 'Mace', jp: 'メイス' },
  { id: 'netherite', name: 'Neth Pot', jp: 'ネザライト' },
  { id: 'pot', name: 'Pot', jp: 'ポーション' },
  { id: 'crystal', name: 'Crystal', jp: 'クリスタル' },
  { id: 'spear', name: 'Spear', jp: 'スピア' },
]

export type Category = 'overall' | 'ffa' | ModeId

export const TIER_CODES = [
  'HT1',
  'LT1',
  'HT2',
  'LT2',
  'HT3',
  'LT3',
  'HT4',
  'LT4',
  'HT5',
  'LT5',
] as const
export type TierCode = (typeof TIER_CODES)[number]

export const TIER_POINTS: Record<TierCode, number> = {
  HT1: 60,
  LT1: 45,
  HT2: 30,
  LT2: 20,
  HT3: 10,
  LT3: 6,
  HT4: 4,
  LT4: 3,
  HT5: 2,
  LT5: 1,
}

export type ModeResult = {
  tier: TierCode
  wins: number
  losses: number
}

export type Player = {
  name: string
  region: 'JP'
  /** 総合ティア（手動指定） */
  overall: TierCode
  /** 各モードのティアから計算したポイント */
  points: number
  matches: number
  tiers: Partial<Record<ModeId, ModeResult>>
  /** kills: 総キル数（表示用） / level: FFAティア（1〜10、10が最高） */
  ffa: { kills: number; level: number }
}

export function tierLevel(tier: TierCode): number {
  return Number(tier.slice(2))
}

export function isHigh(tier: TierCode): boolean {
  return tier.startsWith('HT')
}

export function rankTitle(points: number): string {
  if (points >= 250) return 'Combat Grandmaster'
  if (points >= 150) return 'Combat Master'
  if (points >= 80) return 'Combat Ace'
  if (points >= 40) return 'Combat Specialist'
  if (points >= 15) return 'Combat Cadet'
  return 'Rookie'
}

export const FFA_LEVEL_MIN = 1
export const FFA_LEVEL_MAX = 10

/** FFAティア数値(1〜10) → ティア。1=LT5 … 9=LT1, 10=HT1 */
export function ffaTier(level: number): TierCode {
  const n = Math.min(FFA_LEVEL_MAX, Math.max(FFA_LEVEL_MIN, Math.round(level)))
  return TIER_CODES[TIER_CODES.length - n] ?? 'LT5'
}

/** 勝敗が無い場合は NaN にせず null を返す */
export function winRate(r: ModeResult): number | null {
  const total = r.wins + r.losses
  return total === 0 ? null : r.wins / total
}

/** 勝敗データがまだ無いので 0 で埋めるヘルパー */
const t = (tier: TierCode): ModeResult => ({ tier, wins: 0, losses: 0 })

type PlayerInput = Omit<Player, 'points' | 'matches'>

const PLAYER_INPUTS: PlayerInput[] = [
  {
    name: 'SwettyMC',
    region: 'JP',
    overall: 'HT1',
    tiers: {
      sword: t('HT1'),
      netherite: t('HT2'),
      pot: t('LT2'),
      crystal: t('HT3'),
      spear: t('LT3'),
    },
    ffa: { kills: 1091, level: 9 }, // LT1
  },
  {
    name: 'eagz2035',
    region: 'JP',
    overall: 'HT1',
    tiers: {
      sword: t('LT2'),
      netherite: t('LT1'),
      pot: t('LT1'),
      crystal: t('HT1'),
    },
    ffa: { kills: 954, level: 10 }, // HT1
  },
  {
    name: 'menmen110',
    region: 'JP',
    overall: 'LT1',
    tiers: {
      sword: t('LT1'),
      mace: t('LT2'),
      netherite: t('HT1'),
      pot: t('HT2'),
      crystal: t('LT2'),
    },
    ffa: { kills: 1006, level: 10 }, // HT1
  },
  {
    name: 'Hruka657',
    region: 'JP',
    overall: 'LT3',
    tiers: {
      sword: t('HT4'),
      netherite: t('LT3'),
      pot: t('HT4'),
    },
    ffa: { kills: 458, level: 6 }, // HT3
  },
  {
    name: 'yvvulo', // ※ティア表では「Namq4」と書かれていた人
    region: 'JP',
    overall: 'HT1',
    tiers: {
      sword: t('HT1'),
      mace: t('HT1'),
      netherite: t('LT1'),
      pot: t('HT1'),
    },
    ffa: { kills: 897, level: 8 }, // HT2
  },
  {
    name: 'Yonegon7',
    region: 'JP',
    overall: 'HT3',
    tiers: {
      sword: t('LT3'),
      mace: t('HT1'),
      netherite: t('HT3'),
      pot: t('LT3'),
      crystal: t('HT2'),
      spear: t('LT2'),
    },
    ffa: { kills: 587, level: 7 }, // LT2
  },
  {
    name: 'Tempest5656',
    region: 'JP',
    overall: 'LT2',
    tiers: {
      sword: t('LT1'),
      netherite: t('LT2'),
      pot: t('HT3'),
      crystal: t('HT3'),
    },
    ffa: { kills: 101, level: 7 }, // LT2
  },
  {
    name: 'levelJP5087',
    region: 'JP',
    overall: 'HT4',
    tiers: {
      sword: t('LT4'),
      netherite: t('HT4'),
      pot: t('HT4'),
      spear: t('LT3'),
    },
    ffa: { kills: 98, level: 4 }, // HT4
  },
  {
    name: 'Bid Side 7778',
    region: 'JP',
    overall: 'LT3',
    tiers: {
      sword: t('LT3'),
      netherite: t('HT4'),
      pot: t('LT4'),
      spear: t('LT4'),
    },
    ffa: { kills: 77, level: 4 }, // HT4
  },
  {
    name: 'LEMONZZKIRBY',
    region: 'JP',
    overall: 'HT3',
    tiers: {
      sword: t('HT3'),
      netherite: t('LT3'),
      pot: t('HT3'),
      crystal: t('LT1'),
    },
    ffa: { kills: 191, level: 7 }, // LT2
  },
   {
    name: 'Touyu 893',
    region: 'JP',
    overall: 'HT4',
    tiers: {
      sword: t('LT4'),
      netherite: t('HT4'),
      pot: t('LT4'),
      crystal: t('LT3'),
    },
    ffa: { kills: 209, level: 5 }, // LT3
  },
   {
    name: 'LiruJP',
    region: 'JP',
    overall: 'HT3',
    tiers: {
      sword: t('HT3'),
      mace: t('LT2'),
      netherite: t('HT3'),
      pot: t('HT2'),
      crystal: t('LT2'),
      spear: t('LT3'),
    },
    ffa: { kills: 372, level: 6 }, // HT3
  },
   {
    name: 'koadesu14',
    region: 'JP',
    overall: 'LT4',
    tiers: {
      sword: t('LT4'),
      netherite: t('HT5'),
      pot: t('LT4'),
      crystal: t('LT4'),
    },
    ffa: { kills: 341, level: 5 }, // LT3
  },
   {
    name: 'DebileCorgi3013',
    region: 'JP',
    overall: 'LT1',
    tiers: {
      sword: t('LT1'),
      netherite: t('HT2'),
      pot: t('HT2'),
    },
    ffa: { kills: 22, level: 5 }, // LT3
  },
   {
    name: 'Yukichi0511',
    region: 'JP',
    overall: 'LT5',
    tiers: {
      sword: t('HT5'),
      mace: t('LT5'),
      netherite: t('LT5'),
      pot: t('LT5'),
      spear: t('LT5'),
    },
    ffa: { kills: 6, level: 1 }, // LT5
  },
   {
    name: 'tenhori',
    region: 'JP',
    overall: 'LT1',
    tiers: {
      sword: t('HT1'),
      mace: t('HT2'),
      netherite: t('LT1'),
      pot: t('HT2'),
      crystal: t('HT3'),
    },
    ffa: { kills: 0, level: 1 }, // LT5
  },
   {
     name: 'sitoSAB',
    region: 'JP',
    overall: 'HT2',
    tiers: {
      sword: t('HT1'),
      netherite: t('HT2'),
      pot: t('HT2'),
    },
    ffa: { kills: 0, level: 5 }, // LT3
  },
   {
      name: 'omo pwp',
    region: 'JP',
    overall: 'HT3',
    tiers: {
      sword: t('LT2'),
      netherite: t('HT3'),
      pot: t('HT3'),
    },
    ffa: { kills: 0, level: 5 }, // LT3
  },
   {
      name: 'Eddiee Watson',
    region: 'JP',
    overall: 'HT3',
    tiers: {
      sword: t('LT2'),
      netherite: t('HT3'),
      pot: t('LT3'),
    },
    ffa: { kills: 0, level: 5 }, // LT3
  },
]

function buildPlayers(): Player[] {
  return PLAYER_INPUTS.map((p) => {
    const results = Object.values(p.tiers).filter(
      (r): r is ModeResult => r !== undefined,
    )
    return {
      ...p,
      points: results.reduce((sum, r) => sum + TIER_POINTS[r.tier], 0),
      matches: results.reduce((sum, r) => sum + r.wins + r.losses, 0),
    }
  }).sort(
    (a, b) =>
      TIER_CODES.indexOf(a.overall) - TIER_CODES.indexOf(b.overall) ||
      b.points - a.points ||
      a.name.localeCompare(b.name),
  )
}

const PLAYERS: readonly Player[] = buildPlayers()

export function getRankings(): readonly Player[] {
  return PLAYERS
}

export function getPlayer(name: string): Player | undefined {
  const key = name.toLowerCase()
  return PLAYERS.find((p) => p.name.toLowerCase() === key)
}

export function getMode(id: string): Mode | undefined {
  return MODES.find((m) => m.id === id)
}

export const CATEGORY_IDS: Category[] = [
  'overall',
  'ffa',
  ...MODES.map((m) => m.id),
]

export function isCategory(value: string): value is Category {
  return (CATEGORY_IDS as string[]).includes(value)
}
