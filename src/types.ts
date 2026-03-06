import { z } from 'zod';
import { BaseState } from '@sydorenkoalex/ceves';

/**
 * TodoListState - Current state of a todo list aggregate
 */
export class TodoListState extends BaseState {
  title: string = '';
  items: TodoItem[] = [];
}

export interface TodoItem {
  itemId: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

/**
 * Request body schemas for route validation
 */
export const CreateListBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export const AddItemBodySchema = z.object({
  text: z.string().min(1, 'Item text is required'),
});

export const CompleteItemBodySchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
});

export const DeleteItemBodySchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
});

export type CreateListBody = z.infer<typeof CreateListBodySchema>;
export type AddItemBody = z.infer<typeof AddItemBodySchema>;
export type CompleteItemBody = z.infer<typeof CompleteItemBodySchema>;
export type DeleteItemBody = z.infer<typeof DeleteItemBodySchema>;
