import type { DomainEvent } from '@sydorenkoalex/ceves';

export class ListCreatedEvent implements DomainEvent {
  readonly type = 'ListCreated' as const;
  constructor(public readonly title: string) {}
}
