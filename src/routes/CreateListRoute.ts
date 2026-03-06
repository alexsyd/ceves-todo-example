import { Route, CreateCommandRoute } from '@sydorenkoalex/ceves';
import { CreateListBodySchema, type CreateListBody, type TodoListState } from '../types';
import { ListCreatedEvent } from '../events/ListCreatedEvent';

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
