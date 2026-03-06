import { EventHandler, type IEventHandler, type EventMetadata } from 'ceves';
import type { TodoListState } from '../types';
import { ItemCompletedEvent } from './ItemCompletedEvent';

@EventHandler
export class ItemCompletedHandler
  implements IEventHandler<TodoListState, ItemCompletedEvent>
{
  eventType = 'ItemCompleted';
  aggregateType = 'TodoListAggregate';

  apply(
    state: TodoListState,
    event: ItemCompletedEvent,
    _metadata: EventMetadata
  ): TodoListState {
    return {
      ...state,
      items: state.items.map((item) =>
        item.itemId === event.itemId ? { ...item, completed: true } : item
      ),
    };
  }
}
