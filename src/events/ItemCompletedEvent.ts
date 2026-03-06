import type { DomainEvent } from 'ceves';

export class ItemCompletedEvent implements DomainEvent {
  readonly type = 'ItemCompleted' as const;
  constructor(public readonly itemId: string) {}
}
