import { z } from 'zod';
import { defineCommand, BaseState } from 'ceves';

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
 * Commands
 */
export const CreateListCommandSchema = defineCommand('CreateList', {
  title: z.string().min(1, 'Title is required'),
});

export const AddItemCommandSchema = defineCommand('AddItem', {
  text: z.string().min(1, 'Item text is required'),
});

export const CompleteItemCommandSchema = defineCommand('CompleteItem', {
  itemId: z.string().min(1, 'Item ID is required'),
});

export const DeleteItemCommandSchema = defineCommand('DeleteItem', {
  itemId: z.string().min(1, 'Item ID is required'),
});

export type CreateListCommand = z.infer<typeof CreateListCommandSchema>;
export type AddItemCommand = z.infer<typeof AddItemCommandSchema>;
export type CompleteItemCommand = z.infer<typeof CompleteItemCommandSchema>;
export type DeleteItemCommand = z.infer<typeof DeleteItemCommandSchema>;
