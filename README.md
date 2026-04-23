# Invoice App

A responsive React invoice management app with full CRUD workflow, status lifecycle, theme toggling, and client-side persistence.

## Setup Instructions

### Prerequisites

- Node.js 18+ (or current LTS)
- npm 9+

### Install

```bash
npm install
```

### Run in Development

```bash
npm start
```

The app runs at http://localhost:3000 by default.

### Create Production Build

```bash
npm run build
```

Build output is generated in the `build/` directory.

### Run Tests

```bash
npm test
```

## Architecture Explanation

The app is built with React function components and hooks, with a single orchestrator container and modular presentational components.

### High-Level Flow

- `src/App.js` owns application state and business logic.
- App-level handlers are passed down as props to UI components.
- Components stay focused on rendering and user interaction.
- Shared helpers are centralized in `src/utils/invoiceUtils.js`.

### Component Structure

- `src/components/Sidebar.js`: App navigation shell and theme toggle.
- `src/components/InvoicesHeader.js`: Page heading, filter control, and new invoice action.
- `src/components/InvoiceList.js`: Responsive list/cards for invoices.
- `src/components/InvoiceDetails.js`: Detailed invoice view and invoice actions.
- `src/components/InvoiceFormModal.js`: Create/edit form and line-item entry.
- `src/components/DeleteConfirmationModal.js`: Delete confirmation dialog.
- `src/components/EmptyInvoicesState.js`: Empty list state.

### State and Data Model

Key app state managed in `src/App.js`:

- `invoices`: source of truth for all invoice records.
- `selectedInvoiceId`: current invoice in details view.
- `selectedStatuses`: active filter selections.
- `formData`, `formErrors`, `formAlerts`: form values and validation feedback.
- `isDarkMode`: global theme mode.

Invoice status lifecycle:

- `draft` -> `pending` -> `paid`
- `paid` is terminal in UI flow (not downgraded back).

### Styling and Theming

- Tailwind utility classes for layout and responsive behavior.
- CSS custom properties in `src/index.css` for light/dark theme tokens.
- Theme is applied globally by toggling `theme-dark` on `<body>`.

## Trade-offs

### Chosen Trade-offs

- LocalStorage over backend/IndexedDB:
  - Pros: simple setup, zero infrastructure, instant persistence for local use.
  - Cons: no multi-device sync, limited storage, no server-side conflict resolution.

- Centralized state in `App.js` instead of external state library:
  - Pros: straightforward data flow, fewer dependencies.
  - Cons: `App.js` carries more orchestration logic as features grow.

- Client-side validation only:
  - Pros: immediate feedback and good UX.
  - Cons: no server authority checks because there is no backend.

### Non-goals in Current Scope

- Authentication and user accounts.
- Real-time collaboration.
- Offline sync conflict handling across devices.

## Accessibility Notes

### Implemented

- Semantic controls for actions (`button`, labeled form fields).
- Form labels and inline error messaging for invalid fields.
- Keyboard support for modal dismissal via `Escape`.
- Modal accessibility attributes (`role="dialog"`, `aria-modal="true"`).
- Visible hover/focus states on interactive controls.
- Color system designed for strong contrast in light and dark modes.

### Current Limitations

- Modal focus trap is not fully implemented yet.
- Initial focus management on dialog open can be improved.
- Automated a11y tests (axe/jest-axe) are not yet included.

## Improvements Beyond Requirements

- Defensive LocalStorage hydration:
  - Handles malformed JSON safely.
  - Validates parsed value shape before use.

- Theme persistence across reloads using LocalStorage.

- Responsive layout refinements:
  - Distinct mobile and desktop patterns for invoice list/details/form.
  - Fixed mobile action bar for detail actions.

- Enhanced validation UX:
  - Field-level and item-level validation feedback.
  - Positive numeric checks for quantity and price.

- Status behavior safeguards:
  - "Mark as Paid" disabled when invoice is not pending.

## Tech Stack

- React 19
- Tailwind CSS 3
- Font Awesome
- Create React App tooling (`react-scripts`)

## Project Scripts

- `npm start`: run local dev server.
- `npm run build`: create optimized production build.
- `npm test`: run test runner.
