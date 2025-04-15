<<<<<<< HEAD
# Transportsimple - Trip Planner

A modern web application built with Angular that helps users plan and visualize their travel routes.

## Features

- Interactive route input interface
- Visual representation of travel paths
- Responsive design for both desktop and mobile devices
- Material Design integration
- Real-time trip visualization

## Technical Stack

- Angular (Standalone Components)
- Angular Material
- TypeScript

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (v16 or higher)

## Project Structure

```
src/
  app/
    components/
      route-input/        # Trip input form component
      route-visualization/# Visual representation component
    types/
      route.types.ts      # Type definitions for trips
    app.component.ts      # Main application component
```

## Development Setup

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Application Architecture

### Components

1. **App Component**
   - Acts as the main container
   - Manages the overall layout
   - Handles trip data state
   - Coordinates between input and visualization components

2. **Route Input Component**
   - Provides form interface for trip details
   - Validates user input
   - Emits new trip data to parent

3. **Route Visualization Component**
   - Renders the travel path
   - Updates visualization in real-time
   - Handles trip path representation

### Data Flow

```
RouteInputComponent -> AppComponent -> RouteVisualizationComponent
(Trip Input)          (State Management)  (Visual Output)
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License

MIT License
=======
# transportsimple
A modern web application built with Angular that helps users plan and visualize their travel routes.
>>>>>>> 37f0e377fde01916ccb1ca6c7f937f39bf8dd337
