export function formatNumber(number: number) {
  const suffixes = ['', 'k', 'M', 'B', 'T'];
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier === 0) return number;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;
  const formatted = scaled.toFixed(1);

  return formatted + suffix;
}
