import { EventHandler, type IEventHandler, type EventMetadata } from '@sydorenkoalex/ceves';
import type { TodoListState } from '../types';
import { ItemDeletedEvent } from './ItemDeletedEvent';

@EventHandler
export class ItemDeletedHandler
  implements IEventHandler<TodoListState, ItemDeletedEvent>
{
  eventType = 'ItemDeleted';
  aggregateType = 'TodoListAggregate';

  apply(
    state: TodoListState,
    event: ItemDeletedEvent,
    _metadata: EventMetadata
  ): TodoListState {
    return {
      ...state,
      items: state.items.filter((item) => item.itemId !== event.itemId),
    };
  }
}
