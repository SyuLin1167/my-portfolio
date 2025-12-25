// Animation thresholds and timing constants
export const ANIMATION_THRESHOLDS = {
  SKILL_BAR: 0.25,
  SECTION_CARD: 0.2,
  HISTORY_ITEM: 0.15,
} as const;

export const ANIMATION_TIMINGS = {
  HERO_ROTATE: 800,
  CURSOR_TRAIL_EASE: 0.22,
  HISTORY_STAGGER_STEP: 60,
} as const;

export const CURSOR_TRAIL_CONFIG = {
  DOT_COUNT: 1,
  DOT_SIZE: 22,
  BLUR: 0.5,
} as const;

export const SCROLL_CONFIG = {
  SHOW_TOP_BUTTON_THRESHOLD: 200,
  SMOOTH_SCROLL_BEHAVIOR: 'smooth' as const,
} as const;
