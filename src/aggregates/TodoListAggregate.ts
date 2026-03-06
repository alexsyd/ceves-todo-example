import { AggregateObject, CommandHandler, BusinessRuleViolationError } from 'ceves';
import { TodoListState } from '../types';
import type {
  CreateListCommand,
  AddItemCommand,
  CompleteItemCommand,
  DeleteItemCommand,
} from '../types';
import type { DurableObjectState } from '@cloudflare/workers-types';
import { z } from 'zod';
import { ListCreatedEvent } from '../events/ListCreatedEvent';
import { ItemAddedEvent } from '../events/ItemAddedEvent';
import { ItemCompletedEvent } from '../events/ItemCompletedEvent';
import { ItemDeletedEvent } from '../events/ItemDeletedEvent';

// OpenAPI schemas
const ListParams = z.object({
  id: z.string().describe('Todo list ID'),
});

const CreateListBody = z.object({
  title: z.string().min(1).describe('List title'),
});

const AddItemBody = z.object({
  text: z.string().min(1).describe('Todo item text'),
});

const ItemIdBody = z.object({
  itemId: z.string().min(1).describe('Todo item ID'),
});

const SuccessResponse = z.object({
  success: z.boolean(),
  aggregateId: z.string(),
  version: z.number(),
});

const ErrorResponse = z.object({
  error: z.string(),
  message: z.string(),
});

export class TodoListAggregate extends AggregateObject<TodoListState> {
  constructor(ctx: DurableObjectState, env: any) {
    super(ctx, env, TodoListState);
  }

  @CommandHandler({
    commandType: 'CreateList',
    createCommand: true,
    route: '/lists/:id',
    method: 'POST',
    params: ListParams,
    body: CreateListBody,
    responses: { 200: SuccessResponse, 400: ErrorResponse },
    summary: 'Create a new todo list',
    tags: ['Todo List'],
  })
  async createList(command: CreateListCommand): Promise<ListCreatedEvent> {
    return new ListCreatedEvent(command.title);
  }

  @CommandHandler({
    commandType: 'AddItem',
    createCommand: false,
    route: '/lists/:id/items',
    method: 'POST',
    params: ListParams,
    body: AddItemBody,
    responses: { 200: SuccessResponse, 400: ErrorResponse, 404: ErrorResponse },
    summary: 'Add item to todo list',
    tags: ['Todo List'],
  })
  async addItem(command: AddItemCommand): Promise<ItemAddedEvent> {
    const itemId = crypto.randomUUID();
    return new ItemAddedEvent(itemId, command.text);
  }

  @CommandHandler({
    commandType: 'CompleteItem',
    createCommand: false,
    route: '/lists/:id/items/complete',
    method: 'POST',
    params: ListParams,
    body: ItemIdBody,
    responses: { 200: SuccessResponse, 400: ErrorResponse, 404: ErrorResponse },
    summary: 'Mark item as completed',
    tags: ['Todo List'],
  })
  async completeItem(command: CompleteItemCommand): Promise<ItemCompletedEvent> {
    const item = this.state!.items.find((i) => i.itemId === command.itemId);
    if (!item) {
      throw new BusinessRuleViolationError(
        `Item ${command.itemId} not found in list`
      );
    }
    if (item.completed) {
      throw new BusinessRuleViolationError(
        `Item ${command.itemId} is already completed`
      );
    }
    return new ItemCompletedEvent(command.itemId);
  }

  @CommandHandler({
    commandType: 'DeleteItem',
    createCommand: false,
    route: '/lists/:id/items/delete',
    method: 'POST',
    params: ListParams,
    body: ItemIdBody,
    responses: { 200: SuccessResponse, 400: ErrorResponse, 404: ErrorResponse },
    summary: 'Delete item from todo list',
    tags: ['Todo List'],
  })
  async deleteItem(command: DeleteItemCommand): Promise<ItemDeletedEvent> {
    const item = this.state!.items.find((i) => i.itemId === command.itemId);
    if (!item) {
      throw new BusinessRuleViolationError(
        `Item ${command.itemId} not found in list`
      );
    }
    return new ItemDeletedEvent(command.itemId);
  }
}
