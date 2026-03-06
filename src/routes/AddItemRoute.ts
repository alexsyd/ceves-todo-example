import { Route, CommandRoute } from '@sydorenkoalex/ceves';
import { AddItemBodySchema, type AddItemBody, type TodoListState } from '../types';
import { ItemAddedEvent } from '../events/ItemAddedEvent';

@Route({ method: 'POST', path: '/lists/:id/items' })
export class AddItemRoute extends CommandRoute<AddItemBody, TodoListState, ItemAddedEvent> {
  aggregateType = 'TodoListAggregate';

  schema = {
    request: {
      body: {
        content: {
          'application/json': { schema: AddItemBodySchema },
        },
      },
    },
  };

  async executeCommand(command: AddItemBody): Promise<ItemAddedEvent> {
    const itemId = crypto.randomUUID();
    return new ItemAddedEvent(itemId, command.text);
  }
}
