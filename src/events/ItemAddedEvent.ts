import type { DomainEvent } from '@sydorenkoalex/ceves';

export class ItemAddedEvent implements DomainEvent {
  readonly type = 'ItemAdded' as const;
  constructor(
    public readonly itemId: string,
    public readonly text: string
  ) {}
}
