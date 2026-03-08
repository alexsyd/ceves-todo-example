import { EventHandler, type IEventHandler, type EventMetadata } from '@sydorenkoalex/ceves';
import type { TodoListState } from '../aggregates/TodoListAggregate';
import { ListCreatedEvent } from './ListCreatedEvent';

@EventHandler
export class ListCreatedHandler
  implements IEventHandler<TodoListState, ListCreatedEvent>
{
  eventType = 'ListCreated';
  aggregateType = 'TodoListAggregate';

  apply(
    state: TodoListState,
    event: ListCreatedEvent,
    metadata: EventMetadata
  ): TodoListState {
    return {
      ...state,
      id: metadata.aggregateId,
      orgId: metadata.orgId,
      title: event.title,
      items: [],
    };
  }
}
