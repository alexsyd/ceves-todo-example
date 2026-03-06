import type { DomainEvent } from 'ceves';

export class ItemDeletedEvent implements DomainEvent {
  readonly type = 'ItemDeleted' as const;
  constructor(public readonly itemId: string) {}
}
