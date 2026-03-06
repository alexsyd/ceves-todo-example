import { EventHandler, type IEventHandler, type EventMetadata } from 'ceves';
import type { TodoListState } from '../types';
import { ItemAddedEvent } from './ItemAddedEvent';

@EventHandler
export class ItemAddedHandler
  implements IEventHandler<TodoListState, ItemAddedEvent>
{
  eventType = 'ItemAdded';
  aggregateType = 'TodoListAggregate';

  apply(
    state: TodoListState,
    event: ItemAddedEvent,
    _metadata: EventMetadata
  ): TodoListState {
    return {
      ...state,
      items: [
        ...state.items,
        {
          itemId: event.itemId,
          text: event.text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }
}
