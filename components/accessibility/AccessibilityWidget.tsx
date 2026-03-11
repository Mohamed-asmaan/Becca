"use client";

import { useState, useEffect, useCallback } from "react";
import {
  loadState,
  saveState,
  applyState,
  defaultState,
  type AccessibilityState,
  type ContrastMode,
  type SaturationMode,
  type ContentScale,
} from "@/lib/accessibility";

const PROFILES = [
  { key: "seizureSafe" as const, label: "Seizure Safe Profile", desc: "Clear flashes & reduces color", icon: "⚡" },
  { key: "visionImpaired" as const, label: "Vision Impaired Profile", desc: "Enhances website's visuals", icon: "👁" },
  { key: "adhdFriendly" as const, label: "ADHD Friendly Profile", desc: "More focus & fewer distractions", icon: "🧠" },
  { key: "cognitiveDisability" as const, label: "Cognitive Disability Profile", desc: "Assists with reading & focusing", icon: "◎" },
  { key: "keyboardNav" as const, label: "Keyboard Navigation (Motor)", desc: "Use website with the keyboard", icon: "⌘" },
  { key: "screenReader" as const, label: "Blind Users (Screen Reader)", desc: "Optimize for screen-readers", icon: "🔊" },
  { key: "olderAdults" as const, label: "Older Adults", desc: "Enhance visibility and reading comfort", icon: "👤" },
] as const;

const CONTRAST_OPTIONS: { value: ContrastMode; label: string; icon: string }[] = [
  { value: "none", label: "Default", icon: "○" },
  { value: "dark", label: "Dark Contrast", icon: "🌙" },
  { value: "light", label: "Light Contrast", icon: "☀" },
  { value: "high", label: "High Contrast", icon: "◉" },
];

const SATURATION_OPTIONS: { value: SaturationMode; label: string; icon: string }[] = [
  { value: "none", label: "Default", icon: "○" },
  { value: "high", label: "High Saturation", icon: "💧" },
  { value: "monochrome", label: "Monochrome", icon: "⚫" },
  { value: "low", label: "Low Saturation", icon: "💧" },
];

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideInterface, setHideInterface] = useState(false);
  const [state, setState] = useState<AccessibilityState>(defaultState);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded);
    applyState(loaded);
  }, []);

  // Mute sounds: apply to all video/audio when setting changes
  useEffect(() => {
    const media = document.querySelectorAll("video, audio");
    media.forEach((el) => {
      if (el instanceof HTMLMediaElement) el.muted = state.muteSounds;
    });
  }, [state.muteSounds]);

  const updateState = useCallback((updates: Partial<AccessibilityState>) => {
    const next = { ...state, ...updates };
    setState(next);
    saveState(next);
    applyState(next);
  }, [state]);

  const resetSettings = useCallback(() => {
    setState(defaultState);
    saveState(defaultState);
    applyState(defaultState);
  }, []);

  const toggleProfile = (key: keyof AccessibilityState) => {
    const next = { ...state, [key]: !state[key] };
    // Apply profile presets
    if (key === "seizureSafe" && next.seizureSafe) {
      next.saturation = "low";
      next.stopAnimations = true;
    }
    if (key === "visionImpaired" && next.visionImpaired) {
      next.contrast = "high";
      next.contentScale = 1.2;
    }
    if (key === "adhdFriendly" && next.adhdFriendly) {
      next.stopAnimations = true;
    }
    if (key === "cognitiveDisability" && next.cognitiveDisability) {
      next.readableFont = true;
      next.highlightTitles = true;
      next.highlightLinks = true;
    }
    if (key === "olderAdults" && next.olderAdults) {
      next.contentScale = 1.2;
      next.readableFont = true;
    }
    updateState(next);
  };

  const scaleContent = (dir: "up" | "down") => {
    const scales: ContentScale[] = [1, 1.1, 1.2, 1.3, 1.4, 1.5];
    const i = scales.indexOf(state.contentScale);
    const next = dir === "up" ? scales[Math.min(i + 1, scales.length - 1)] : scales[Math.max(i - 1, 0)];
    updateState({ contentScale: next });
  };

  if (hideInterface) {
    return (
      <button
        type="button"
        onClick={() => setHideInterface(false)}
        className="fixed bottom-4 right-4 z-[1000] w-9 h-9 rounded-full bg-[#282828] border border-white/30 flex items-center justify-center text-white shadow-lg hover:bg-[#333] hover:border-accent transition-colors"
        aria-label="Show accessibility settings"
      >
        <span className="text-base" aria-hidden="true">♿</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[1000] w-9 h-9 rounded-full bg-[#282828] border border-white/30 flex items-center justify-center text-white shadow-lg hover:bg-[#333] hover:border-accent transition-colors"
        aria-label="Open accessibility adjustments"
      >
        <span className="text-base" aria-hidden="true">♿</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[1100] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility Adjustments"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white text-[#282828] shadow-2xl rounded-l-lg"
            style={{ minHeight: "min(600px, 90vh)" }}
          >
            <header className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between gap-4 z-10">
              <h2 className="text-lg font-bold">Accessibility Adjustments</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded hover:bg-gray-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </header>

            <div className="p-4 space-y-6">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={resetSettings}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  ↻ Reset Settings
                </button>
                <button
                  type="button"
                  onClick={() => setHideInterface(true)}
                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  ⊘ Hide Interface
                </button>
              </div>

              {/* Profiles */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-3">
                  Choose the right accessibility profile
                </h3>
                <div className="space-y-2">
                  {PROFILES.map(({ key, label, desc, icon }) => (
                    <div key={key} className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-lg">{icon}</span>
                        <div>
                          <p className="font-medium text-sm">{label}</p>
                          <p className="text-xs text-gray-500">{desc}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={state[key]}
                        onClick={() => toggleProfile(key)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          state[key] ? "bg-accent-dark" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                            state[key] ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Content Adjustments */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-3">
                  Content Adjustments
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-50 rounded flex flex-col items-center gap-2">
                    <span className="text-lg">↔</span>
                    <p className="text-xs font-medium text-center">Content Scaling</p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scaleContent("down")}
                        className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm w-12 text-center">{state.contentScale}</span>
                      <button
                        type="button"
                        onClick={() => scaleContent("up")}
                        className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateState({ readableFont: !state.readableFont })}
                    className={`p-3 rounded flex flex-col items-center gap-2 ${
                      state.readableFont ? "bg-accent/30" : "bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">A≡</span>
                    <p className="text-xs font-medium">Readable Font</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateState({ highlightTitles: !state.highlightTitles })}
                    className={`p-3 rounded flex flex-col items-center gap-2 ${
                      state.highlightTitles ? "bg-accent/30" : "bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">T</span>
                    <p className="text-xs font-medium">Highlight Titles</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateState({ highlightLinks: !state.highlightLinks })}
                    className={`p-3 rounded flex flex-col items-center gap-2 ${
                      state.highlightLinks ? "bg-accent/30" : "bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">🔗</span>
                    <p className="text-xs font-medium">Highlight Links</p>
                  </button>
                </div>
              </section>

              {/* Contrast */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-3">
                  Contrast Adjustments
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CONTRAST_OPTIONS.map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateState({ contrast: value })}
                      className={`px-4 py-2 rounded flex items-center gap-2 ${
                        state.contrast === value ? "bg-accent-dark text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <span>{icon}</span>
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Saturation */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-3">
                  Saturation
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SATURATION_OPTIONS.map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateState({ saturation: value })}
                      className={`px-4 py-2 rounded flex items-center gap-2 ${
                        state.saturation === value ? "bg-accent-dark text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <span>{icon}</span>
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Orientation */}
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 mb-3">
                  Orientation Adjustments
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => updateState({ muteSounds: !state.muteSounds })}
                    className={`p-3 rounded flex items-center gap-2 text-sm ${
                      state.muteSounds ? "bg-accent/30" : "bg-gray-50"
                    }`}
                  >
                    <span>🔇</span> Mute Sounds
                  </button>
                  <button
                    type="button"
                    onClick={() => updateState({ hideImages: !state.hideImages })}
                    className={`p-3 rounded flex items-center gap-2 text-sm ${
                      state.hideImages ? "bg-accent/30" : "bg-gray-50"
                    }`}
                  >
                    <span>🖼</span> Hide Images
                  </button>
                  <button
                    type="button"
                    onClick={() => updateState({ stopAnimations: !state.stopAnimations })}
                    className={`p-3 rounded flex items-center gap-2 text-sm ${
                      state.stopAnimations ? "bg-accent/30" : "bg-gray-50"
                    }`}
                  >
                    <span>⚡</span> Stop Animations
                  </button>
                  <button
                    type="button"
                    onClick={() => updateState({ highlightFocus: !state.highlightFocus })}
                    className={`p-3 rounded flex items-center gap-2 text-sm ${
                      state.highlightFocus ? "bg-accent/30" : "bg-gray-50"
                    }`}
                  >
                    <span>◎</span> Highlight Focus
                  </button>
                </div>
              </section>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
