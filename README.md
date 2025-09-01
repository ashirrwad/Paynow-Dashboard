# Agent Decision Viewer - Lite

This project is a small-scale frontend application built to display decisions from a mock "agentic" service. It provides a clean, responsive interface for submitting transaction data, viewing a history of recent decisions, and inspecting the details and reasoning behind each decision.

## Demo

You can view the demo here: [PayNow-Dashboard](https://paynow-dashboard-4kfyizotr-ashirrwads-projects.vercel.app/login)

*(Placeholder for a 90-120s screen recording (GIF or MP4) of the application in use.)*

## Features

-   **Submit Decisions**: A simple form to submit a new transaction with an `amount`, `payee`, and `customerId`.
-   **Real-time Results Table**: Displays the last 20 decisions, automatically updating as new decisions are made.
-   **Detailed Decision Drawer**: Click on any row to open a drawer with in-depth details, including:
    -   Decision reasons.
    -   A collapsible "Agent Trace" that shows the step-by-step process the agent took.
-   **State Handling**: Clear loading, empty, and error states to inform the user of the application's status.
-   **Accessibility**: The UI is designed with accessibility in mind, featuring labeled inputs and a fully keyboard-navigable decision drawer.
-   **Secure PII Masking**: Advanced `customerId` masking system with configurable options (e.g., `c_***123`) protects sensitive information across all UI components. Features centralized masking utilities with data transformation support.
-   **Performant UI**: Employs debouncing for form inputs and memoization for table rows to ensure a smooth and responsive user experience.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (React)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
-   **Linting**: [ESLint](https://eslint.org/)

## Getting Started

To run the project locally, follow these steps.

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

3.  **Run Tests**:
    To run the unit tests for the project, use:
    ```bash
    npm test
    ```

## Performance and Optimizations

This project incorporates multiple strategies to ensure a responsive and efficient user experience.

1.  **Debounced Form Submission**: The `useDebounce` hook is applied to the form submission handler. This prevents a flurry of API requests if the user interacts rapidly with the form, reducing server load and avoiding potential race conditions. It ensures that the API is only called when the user has paused their input.

2.  **Memoized Row Rendering**: The `DecisionRow` component in the results table is wrapped with `React.memo`. This optimization prevents the entire table from re-rendering when the data changes. Only the rows whose props have actually changed will re-render, which significantly improves performance, especially with frequently updating data.

3.  **Efficient State Management**: Zustand's selector-based model ensures that components only re-render when the specific slice of state they subscribe to changes, preventing unnecessary render cycles that can be common with less optimized state management setups.

4.  **Centralized PII Protection**: The `maskCustomerId` utility in `/src/utils/formatting.ts` provides a centralized approach to protecting customer data across all components. The system offers:
    -   **Configurable Masking**: Customizable prefix, mask character, suffix length, and mask length
    -   **Data Transformation**: Optional utilities for masking at the data level (`maskCustomerIdInData`, `maskCustomerIdsInArray`)
    -   **Type Safety**: Full TypeScript support with proper interfaces and generics
    -   **Backward Compatibility**: Maintains existing usage while providing enhanced features
    -   **Consistent Application**: Used across DecisionTable, DecisionDrawer, and search functionality

## Design Trade-offs & Decisions

1.  **Hybrid Rendering (Server + Client Components)**: The dashboard page (`/dashboard`) is structured using a hybrid approach. The main page is a Next.js Server Component that acts as a static shell, while the interactive content is encapsulated in a Client Component (`DashboardContent`). This aligns with the modern Next.js App Router paradigm and provides a good foundation for future optimizations. The trade-off for simplicity in this iteration is that initial data is still fetched on the client. A future enhancement would be to fetch the initial decision list within the Server Component to leverage full SSR for a faster initial page load.

2.  **Data Fetching (`fetch` vs. React Query)**: The native `fetch` API was used for API communication to keep the dependency footprint minimal. While a library like React Query offers powerful features like caching, automatic refetching, and request deduplication, it would have been an over-engineering for this project's simple data requirements. Using `fetch` directly provided sufficient functionality and full control over the data flow without adding another library.

3.  **Authentication Token Storage (`localStorage`)**: For session persistence, a mock authentication token is stored in `localStorage`. This choice was made for its simplicity and effectiveness in a client-rendered application. It allows the user's session to survive page reloads. The trade-off is that `localStorage` is vulnerable to XSS attacks. In a production application with real user data, storing tokens in an `HttpOnly` cookie would be a more secure alternative.

4.  **State Management (Zustand)**: Zustand was chosen over local state (`useState`/`useReducer`) or a heavier library like Redux. It provides a simple, unopinionated API for centralized state management that is easy to reason about without the boilerplate of traditional Flux architectures. This was ideal for sharing state between the `DecisionCard`, `DecisionTable`, and `DecisionDrawer` without prop-drilling.

5.  **Styling (Tailwind CSS)**: Tailwind CSS was used for its utility-first approach, which allows for rapid UI development and easy maintenance. It avoids the need for separate CSS files and the context-switching that comes with them, keeping the component logic and its styling co-located.
