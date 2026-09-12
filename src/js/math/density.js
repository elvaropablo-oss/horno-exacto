// Preserve the actual numeric density in the explanation, including custom values.
export function formatDensity(density) {
  return String(Number(density)).replace('.', ',');
}

export function gramsToMl(grams, density) {
  const g = Number(grams);
  const d = Number(density);
  if (!Number.isFinite(g) || g < 0 || !Number.isFinite(d) || d <= 0) return null;
  return g / d;
}

export function mlToGrams(ml, density) {
  const volume = Number(ml);
  const d = Number(density);
  if (!Number.isFinite(volume) || volume < 0 || !Number.isFinite(d) || d <= 0) return null;
  return volume * d;
}
