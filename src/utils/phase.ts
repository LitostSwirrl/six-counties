import type { TimelineNode } from '../content/timeline';

export function taiwanDateKey(date: Date): string {
  return new Date(date.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function millisecondsUntilNextTaiwanMidnight(date: Date): number {
  const nextMidnight = new Date(`${taiwanDateKey(date)}T00:00:00+08:00`);
  nextMidnight.setTime(nextMidnight.getTime() + 24 * 60 * 60 * 1000);
  return Math.max(1000, nextMidnight.getTime() - date.getTime() + 1000);
}

export function currentPhaseIndex(nodes: TimelineNode[], today: Date): number {
  if (nodes.length === 0) return -1;
  const todayStr = taiwanDateKey(today);
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node && (node.deadline === '' || todayStr <= node.deadline)) return i;
  }
  return -1;
}
