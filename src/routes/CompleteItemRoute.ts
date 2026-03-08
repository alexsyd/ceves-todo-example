import { z } from 'zod';
import { Route, CommandRoute } from '@sydorenkoalex/ceves';
import type { TodoListState } from '../aggregates/TodoListAggregate';
import { ItemCompletedEvent } from '../events/ItemCompletedEvent';

const CompleteItemBodySchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
});

type CompleteItemBody = z.infer<typeof CompleteItemBodySchema>;

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
