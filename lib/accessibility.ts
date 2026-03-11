/**
 * Accessibility state and persistence
 * Settings are applied via data attributes on document.documentElement
 */

export type ContrastMode = "none" | "dark" | "light" | "high";
export type SaturationMode = "none" | "high" | "monochrome" | "low";
export type ContentScale = 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5;

export interface AccessibilityState {
  contrast: ContrastMode;
  saturation: SaturationMode;
  contentScale: ContentScale;
  readableFont: boolean;
  highlightTitles: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
  highlightFocus: boolean;
  hideImages: boolean;
  muteSounds: boolean;
  // Profiles (combine multiple settings)
  seizureSafe: boolean;
  visionImpaired: boolean;
  adhdFriendly: boolean;
  cognitiveDisability: boolean;
  keyboardNav: boolean;
  screenReader: boolean;
  olderAdults: boolean;
}

const STORAGE_KEY = "becca-accessibility";

export const defaultState: AccessibilityState = {
  contrast: "none",
  saturation: "none",
  contentScale: 1,
  readableFont: false,
  highlightTitles: false,
  highlightLinks: false,
  stopAnimations: false,
  highlightFocus: false,
  hideImages: false,
  muteSounds: false,
  seizureSafe: false,
  visionImpaired: false,
  adhdFriendly: false,
  cognitiveDisability: false,
  keyboardNav: false,
  screenReader: false,
  olderAdults: false,
};

export function loadState(): AccessibilityState {
  if (typeof window === "undefined") return defaultState;
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as Partial<AccessibilityState>;
      return { ...defaultState, ...parsed };
    }
  } catch {
    // ignore
  }
  return defaultState;
}

export function saveState(state: AccessibilityState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function applyState(state: AccessibilityState): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  root.dataset.a11yContrast = state.contrast;
  root.dataset.a11ySaturation = state.saturation;
  root.dataset.a11yScale = String(state.contentScale);
  root.dataset.a11yReadableFont = String(state.readableFont);
  root.dataset.a11yHighlightTitles = String(state.highlightTitles);
  root.dataset.a11yHighlightLinks = String(state.highlightLinks);
  root.dataset.a11yStopAnimations = String(state.stopAnimations);
  root.dataset.a11yHighlightFocus = String(state.highlightFocus);
  root.dataset.a11yHideImages = String(state.hideImages);
  root.dataset.a11yMuteSounds = String(state.muteSounds);
}
