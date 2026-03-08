import { z } from 'zod';
import { Route, CreateCommandRoute } from '@sydorenkoalex/ceves';
import type { TodoListState } from '../aggregates/TodoListAggregate';
import { ListCreatedEvent } from '../events/ListCreatedEvent';

const CreateListBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

type CreateListBody = z.infer<typeof CreateListBodySchema>;

@Route({ method: 'POST', path: '/lists/:id' })
export class CreateListRoute extends CreateCommandRoute<CreateListBody, TodoListState, ListCreatedEvent> {
  aggregateType = 'TodoListAggregate';

  schema = {
    request: {
      body: {
        content: {
          'application/json': { schema: CreateListBodySchema },
        },
      },
    },
  };

  async executeCommand(command: CreateListBody): Promise<ListCreatedEvent> {
    return new ListCreatedEvent(command.title);
  }
}
