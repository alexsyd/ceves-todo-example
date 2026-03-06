/**
 * Todo List - Ceves Event Sourcing Example
 *
 * A simple todo list API built with Ceves framework on Cloudflare Workers.
 * Demonstrates event sourcing with Durable Objects.
 */

import { createRouter } from '@sydorenkoalex/ceves';
import { TodoListAggregate } from './aggregates/TodoListAggregate';

// Import routes to trigger @Route decorator registration
import './routes/CreateListRoute';
import './routes/AddItemRoute';
import './routes/CompleteItemRoute';
import './routes/DeleteItemRoute';
import './routes/GetListRoute';

// Import event handlers to trigger @EventHandler decorator registration
import './events/ListCreatedHandler';
import './events/ItemAddedHandler';
import './events/ItemCompletedHandler';
import './events/ItemDeletedHandler';

// Export Durable Object class
export { TodoListAggregate };

// Create router with auto-discovered routes and OpenAPI docs
const app = createRouter({
  openapi: {
    title: 'Todo List API',
    version: '1.0.0',
    description: 'Event-sourced Todo List built with Ceves',
  },
});

export default app;
