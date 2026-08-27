import type { TimelineNode } from '../content/timeline';

export function currentPhaseIndex(nodes: TimelineNode[], today: Date): number {
  if (nodes.length === 0) return -1;
  const todayStr = today.toISOString().slice(0, 10);
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node && todayStr <= node.deadline) return i;
  }
  return nodes.length - 1;
}
