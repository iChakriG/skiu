# Contributing to Skiu

Thank you for your interest in contributing to Skiu!

## Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Set up environment variables: copy `.env.example` to `.env` (see README)
5. Run migrations in Supabase (see README)
6. Start development server: `npm run dev`

## Architecture Guidelines

This project follows Clean Architecture principles:

- **Domain Layer**: Pure business logic, no dependencies on external frameworks
- **Application Layer**: Use cases that orchestrate domain logic
- **Infrastructure Layer**: External concerns (database, APIs, etc.)
- **Presentation Layer**: API routes and UI components

When adding new features:
1. Start with domain entities and interfaces
2. Create use cases in the application layer
3. Implement repositories in the infrastructure layer
4. Create API routes in the presentation layer

## Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Write clear, descriptive names
- Add comments for complex logic
- Run `npm run lint` before committing

## Testing

- Write tests for use cases
- Test API endpoints
- Ensure type safety

## Pull Requests

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Update documentation if needed
5. Submit a pull request with a clear description
