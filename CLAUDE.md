# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server (Vite + React SWC)
npm run build        # TypeScript check + Vite production build
npm run lint         # ESLint
npm run preview      # Preview production build
```

No test runner is configured.

## Architecture Overview

Reserve Pro Backoffice is a React 18 + TypeScript SPA built with Vite. It's a business management platform for appointment-based services (salons, professionals, etc.) with role-based access control, real-time notifications, and payment integration.

### Data Layer

- **React Query (TanStack Query)** is the primary data management solution. All API data flows through query/mutation hooks in `src/queries/`. Query keys are centralized in `src/queries/queryKeys.ts`.
- **Redux Toolkit** exists but is minimal — only stores `session` and `accessToken` in a single slice (`src/store/feature/session/`). Could be removed entirely in favor of React Query + context.
- **Axios** services in `src/services/` handle all HTTP calls. Auth interceptor in `src/config/` adds Bearer token from localStorage.
- **Adapters** in `src/adapters/` transform API response models (`IAPIUser`) to app models (`IUser`).

### Auth & Permissions

- Token stored in localStorage as `accessToken`. `SessionProvider` validates on mount via `AuthServices.me()`.
- Four roles: MASTER (system admin), OWNER (enterprise owner), ADMIN, BASIC — each with predefined permission sets.
- 32 granular permissions defined in `src/lib/constants/permissions.ts`. Check with `hasPermission(user, permission)`.
- Routes protected by `ProtectedRoute` (token check), `RouteAuthorizationWrapper` (permission check), and `MasterRouteProtector` (admin-only).

### Routing

Top-level routes in `App.tsx`. Authenticated routes nest under `MainPage` which wraps content in `SessionProvider → DataProvider → NotificationsProvider → SidebarProvider`.

Key route segments: `/company`, `/members`, `/services`, `/appointment`, `/customers`, `/set-hours`, `/calendar`, `/absences`, `/payments`, `/settings`. Admin routes at `/admin/*`.

### Provider Hierarchy

```
BrowserRouter → StoreProvider (Redux) → QueryProvider (React Query) → App
  MainPage: SessionProvider → DataProvider → NotificationsProvider → SidebarProvider → Routes
```

### UI & Styling

- **Tailwind CSS** with custom theme (HSL CSS variables, dark mode via class). Config has custom colors (soft palette a-g, sidebar variants, chart colors).
- **Radix UI** primitives wrapped in `src/components/ui/`. Variants managed with Class Variance Authority.
- **React Hook Form + Zod** for form handling and validation.
- **Framer Motion** for animations, **Recharts** for dashboard charts.

### Import Alias

`@/*` maps to `src/*` (configured in tsconfig and vite.config).

### External Integrations

- **Mercado Pago** for payments/subscriptions
- **Google Maps** for geolocation/geocoding
- **AWS S3** for media storage
- **Socket.io** for real-time notifications
- **Google OAuth** for authentication

### Code Patterns

- API service classes in `src/services/` — one per domain (auth, company, member, appointment, etc.)
- React Query hooks in `src/queries/` — one file per domain, exports `useQuery`/`useMutation` hooks
- Page-level components in `src/pages/{feature}/components/` — colocated with their page
- Shared components in `src/components/common/`
- TypeScript interfaces in `src/interfaces/`, API-specific interfaces in `src/interfaces/api/`
