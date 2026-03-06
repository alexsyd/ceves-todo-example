import { Route, CommandRoute } from 'ceves';
import { CompleteItemBodySchema, type CompleteItemBody, type TodoListState } from '../types';
import { ItemCompletedEvent } from '../events/ItemCompletedEvent';

@Route({ method: 'POST', path: '/lists/:id/items/complete' })
export class CompleteItemRoute extends CommandRoute<CompleteItemBody, TodoListState, ItemCompletedEvent> {
  aggregateType = 'TodoListAggregate';

  schema = {
    request: {
      body: {
        content: {
          'application/json': { schema: CompleteItemBodySchema },
        },
      },
    },
  };

  async executeCommand(command: CompleteItemBody): Promise<ItemCompletedEvent> {
    return new ItemCompletedEvent(command.itemId);
  }
}
