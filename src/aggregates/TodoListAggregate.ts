import { AggregateObject, BaseState } from '@sydorenkoalex/ceves';
import type { DurableObjectState } from '@cloudflare/workers-types';

export interface TodoItem {
  itemId: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export class TodoListState extends BaseState {
  title: string = '';
  items: TodoItem[] = [];
}

export class TodoListAggregate extends AggregateObject<TodoListState> {
  constructor(ctx: DurableObjectState, env: any) {
    super(ctx, env, TodoListState);
  }
}
