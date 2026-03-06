import { AggregateObject } from 'ceves';
import { TodoListState } from '../types';
import type { DurableObjectState } from '@cloudflare/workers-types';

export class TodoListAggregate extends AggregateObject<TodoListState> {
  constructor(ctx: DurableObjectState, env: any) {
    super(ctx, env, TodoListState);
  }
}
