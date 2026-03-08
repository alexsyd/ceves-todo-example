import { z } from 'zod';
import { Route, CommandRoute } from '@sydorenkoalex/ceves';
import type { TodoListState } from '../aggregates/TodoListAggregate';
import { ItemDeletedEvent } from '../events/ItemDeletedEvent';

const DeleteItemBodySchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
});

type DeleteItemBody = z.infer<typeof DeleteItemBodySchema>;

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
