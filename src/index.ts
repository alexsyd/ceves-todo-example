/**
 * Todo List - Ceves Event Sourcing Example
 *
 * A simple todo list API built with Ceves framework on Cloudflare Workers.
 * Demonstrates event sourcing with Durable Objects.
 */

import './_discover.generated';
import { createRouter } from '@sydorenkoalex/ceves';
import { TodoListAggregate } from './aggregates/TodoListAggregate';

// Export Durable Object class
export { TodoListAggregate };

// Create router with auto-discovered routes and OpenAPI docs
const app = createRouter({
  openapi: {
    title: 'Todo List API',
    version: '1.0.0',
    description: 'Event-sourced Todo List built with Ceves',
  },
  discover: ['./routes/**/*.ts', './events/**/*.ts'],
});

export default app;
