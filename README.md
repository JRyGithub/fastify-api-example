# fastify-ex

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

# Fastify API Example

A test project demonstrating a modern Node.js API built with Fastify, TypeScript, and TypeBox schemas. This project serves as a learning example and template for building fast, type-safe REST APIs.

## 🚀 Features

- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Full type safety throughout the application
- **TypeBox** - Runtime type validation and schema generation
- **Swagger/OpenAPI** - Interactive API documentation
- **Pokemon API Proxy** - Example endpoints that proxy data from PokeAPI
- **Caching** - LRU cache for improved performance
- **Security** - Helmet, CORS, and rate limiting
- **Metrics** - Built-in metrics endpoint
- **Hot Reload** - Development server with auto-restart

## 📋 Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- TypeScript knowledge

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/JRyGithub/fastify-api-example.git
cd fastify-api-example
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

The server will start at `http://localhost:3000`

## 📖 API Documentation

Visit `http://localhost:3000/docs` to explore the interactive Swagger UI documentation.

### Available Endpoints

- **GET /api/pokemon** - List Pokemon with pagination
  - Query parameters: `limit` (1-200), `offset` (0+)
- **GET /api/pokemon/{name}** - Get specific Pokemon by name or ID
- **GET /metrics** - Application metrics
- **GET /docs** - Swagger UI documentation
- **GET /docs/json** - OpenAPI specification

### Example Requests

```bash
# List the first 10 Pokemon
curl "http://localhost:3000/api/pokemon?limit=10"

# Get Pikachu's information
curl "http://localhost:3000/api/pokemon/pikachu"

# Get Pokemon by ID
curl "http://localhost:3000/api/pokemon/25"
```

## 🏗️ Project Structure

```
src/
├── app.ts                 # Main application entry point
├── config/
│   └── env.ts            # Environment configuration
├── features/
│   └── pokemon/
│       ├── routes.ts     # Pokemon API routes
│       └── types.ts      # TypeBox schemas
├── lib/
│   ├── api.ts           # HTTP client utilities
│   ├── cache.ts         # LRU cache implementation
│   ├── pokeapi.ts       # PokeAPI client
│   └── types.ts         # Common type definitions
└── plugins/
    ├── swagger.ts       # Swagger/OpenAPI setup
    ├── security.ts     # Security middleware
    └── metrics.ts      # Metrics collection
```

## 🔧 Development Scripts

```bash
# Start development server with hot reload
bun run dev

# Start production server
bun run start

# Run TypeScript type checking
bun run check

# Run ESLint
bun run lint

# Format code with Prettier
bun run format
```

## 🔒 Environment Variables

The application uses the following environment variables (all optional with defaults):

```bash
NODE_ENV=development          # Environment mode
PORT=3000                    # Server port
HOST=0.0.0.0                # Server host
CORS_ORIGIN=*               # CORS allowed origins
```

## 🧪 Testing the API

You can test the API using:
- **Swagger UI**: `http://localhost:3000/docs`
- **curl**: See example requests above
- **Postman**: Import the OpenAPI spec from `/docs/json`
- **Thunder Client** (VS Code extension)

## 📚 Learning Resources

This project demonstrates:
- Modern Fastify application structure
- TypeScript integration with runtime validation
- Plugin architecture and encapsulation
- OpenAPI documentation generation
- Error handling and logging
- Performance optimization with caching
- Security best practices

## 🤝 Contributing

This is a test/learning project. Feel free to:
- Fork and experiment
- Submit issues for bugs or improvements
- Create pull requests with enhancements
- Use as a starting template for your own projects

## 📄 License

This project is for educational purposes. Feel free to use it as a reference or starting point for your own projects.

## 🙏 Acknowledgments

- [Fastify](https://www.fastify.io/) - The web framework
- [PokeAPI](https://pokeapi.co/) - The Pokemon data source
- [TypeBox](https://github.com/sinclairzx81/typebox) - JSON Schema validation
- [Bun](https://bun.sh/) - JavaScript runtime and package manager
