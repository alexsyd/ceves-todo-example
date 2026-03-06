import { Route, CommandRoute } from 'ceves';
import { DeleteItemBodySchema, type DeleteItemBody, type TodoListState } from '../types';
import { ItemDeletedEvent } from '../events/ItemDeletedEvent';

@Route({ method: 'POST', path: '/lists/:id/items/delete' })
export class DeleteItemRoute extends CommandRoute<DeleteItemBody, TodoListState, ItemDeletedEvent> {
  aggregateType = 'TodoListAggregate';

  schema = {
    request: {
      body: {
        content: {
          'application/json': { schema: DeleteItemBodySchema },
        },
      },
    },
  };

  async executeCommand(command: DeleteItemBody): Promise<ItemDeletedEvent> {
    return new ItemDeletedEvent(command.itemId);
  }
}
