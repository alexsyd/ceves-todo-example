# Ceves Todo Example

A simple Todo List API built with [Ceves](https://github.com/alexsyd/ceves) event sourcing framework on Cloudflare Workers.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/alexsyd/ceves-todo-example)

## What is this?

This is a fully event-sourced Todo List API running on Cloudflare Workers with Durable Objects. Every change is stored as an immutable event, giving you a complete audit trail and the ability to replay state from scratch.

**Built with:**
- [Ceves](https://github.com/alexsyd/ceves) - Event sourcing framework
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless runtime
- [Durable Objects](https://developers.cloudflare.com/durable-objects/) - Zero-latency state
- [R2](https://developers.cloudflare.com/r2/) - Event storage

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/lists/:id` | Create a new todo list |
| GET | `/lists/:id` | Get todo list state |
| POST | `/lists/:id/items` | Add item to a list |
| POST | `/lists/:id/items/complete` | Mark item as completed |
| POST | `/lists/:id/items/delete` | Delete item from a list |
| GET | `/docs` | Swagger UI (OpenAPI docs) |

## Quick Start

```bash
# Install dependencies
npm install

# Run locally
wrangler dev

# Deploy
wrangler deploy
```

## Usage

```bash
# Create a todo list
curl -X POST http://localhost:8787/lists/my-list \
  -H "Content-Type: application/json" \
  -d '{"title": "Shopping List"}'

# Add items
curl -X POST http://localhost:8787/lists/my-list/items \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy milk"}'

curl -X POST http://localhost:8787/lists/my-list/items \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy bread"}'

# Get the list (shows items with their IDs)
curl http://localhost:8787/lists/my-list

# Complete an item (use itemId from GET response)
curl -X POST http://localhost:8787/lists/my-list/items/complete \
  -H "Content-Type: application/json" \
  -d '{"itemId": "<item-id>"}'

# Delete an item
curl -X POST http://localhost:8787/lists/my-list/items/delete \
  -H "Content-Type: application/json" \
  -d '{"itemId": "<item-id>"}'
```

## Project Structure

```
src/
  index.ts                          # Worker entry point
  types.ts                          # State and Zod body schemas
  aggregates/
    TodoListAggregate.ts            # Durable Object aggregate
  routes/
    CreateListRoute.ts              # POST /lists/:id
    GetListRoute.ts                 # GET /lists/:id
    AddItemRoute.ts                 # POST /lists/:id/items
    CompleteItemRoute.ts            # POST /lists/:id/items/complete
    DeleteItemRoute.ts              # POST /lists/:id/items/delete
  events/
    ListCreatedEvent.ts             # Domain events
    ItemAddedEvent.ts
    ItemCompletedEvent.ts
    ItemDeletedEvent.ts
    ListCreatedHandler.ts           # Event handlers (apply events to state)
    ItemAddedHandler.ts
    ItemCompletedHandler.ts
    ItemDeletedHandler.ts
```

## How It Works

1. **Commands** arrive as HTTP requests (e.g., POST `/lists/:id/items`)
2. The `@Route` decorator auto-registers each route with the OpenAPI router
3. `CommandRoute` validates the request body and forwards to the **Durable Object**
4. The DO executes business logic via `executeCommand()` and produces a **domain event**
5. The `@EventHandler` applies the event to update state
6. State is persisted to DO storage (zero-latency) and events to R2 (audit log)

No database migrations, no ORM, no manual state management. Just commands in, events out.

## License

MIT - see [Ceves](https://github.com/alexsyd/ceves) for details.
