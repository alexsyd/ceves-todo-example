import type { DomainEvent } from 'ceves';

export class ListCreatedEvent implements DomainEvent {
  readonly type = 'ListCreated' as const;
  constructor(public readonly title: string) {}
}
