import { z } from 'zod';
import { Route, CommandRoute } from '@sydorenkoalex/ceves';
import type { TodoListState } from '../aggregates/TodoListAggregate';
import { ItemAddedEvent } from '../events/ItemAddedEvent';

const AddItemBodySchema = z.object({
  text: z.string().min(1, 'Item text is required'),
});

type AddItemBody = z.infer<typeof AddItemBodySchema>;

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
