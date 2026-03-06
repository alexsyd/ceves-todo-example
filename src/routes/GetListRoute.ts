import { Route, QueryRoute } from 'ceves';
import type { TodoListState } from '../types';

@Route({ method: 'GET', path: '/lists/:id' })
export class GetListRoute extends QueryRoute<TodoListState, Record<string, never>, TodoListState> {
  aggregateType = 'TodoListAggregate';

  async executeQuery(state: TodoListState): Promise<TodoListState> {
    return state;
  }
}
