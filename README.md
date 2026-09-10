# Small Business Lending Pipeline Dashboard

A Vue 3 operational dashboard for small-business lending teams. It gives relationship managers and underwriting leads one view of pipeline volume, SLA exceptions, upcoming disbursements, and early signs of stress in the existing loan portfolio.

The dashboard currently uses local sample data and is intended as a first-pass product experience. It is not connected to a core banking system and does not provide authentication or role-based access.

## Features

- Summary metrics for applications in flight, pipeline value, past-SLA applications, next-seven-day funding, and at-risk loans
- Pipeline funnel covering submitted, document collection, underwriting, credit committee, approved, disbursed, declined, and withdrawn stages
- Aging and SLA exception table, sorted by days over the stage target
- Disbursement queue with funding targets, outstanding conditions, and status flags
- At-risk existing-loan table with balance, payment status, relationship manager, and stress reason
- Filters for relationship manager, underwriter, loan type, and date range

## Tech Stack

- Vue 3 with `<script setup>` and TypeScript
- Vite
- Vuetify 3 and Material Design Icons
- Vue Router
- Chart.js and Vue Chart.js dependencies for data visualizations

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Vite will print the local development URL, normally `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

`npm run build` runs the TypeScript project check and creates the Vite production build.

## Project Structure

```text
src/
	App.vue                         Root router outlet
	main.ts                         Application entry point
	style.css                       Global dashboard styles and theme variables
	views/DashboardView.vue         Main dashboard layout
	components/dashboard/           Metric, filter, and funnel components
	composables/useDashboardData.ts Filtered and derived dashboard data
	data/dashboardData.ts           Typed sample applications and loan records
	data/metrics.ts                 Static fallback metric data
	plugins/vuetify.ts              Vuetify configuration
	router/index.ts                 Application routes
	types/dashboard.ts              Shared dashboard types
	utils/formatters.ts             Currency and date helpers
```

## Data and Business Rules

Sample records live in [`src/data/dashboardData.ts`](src/data/dashboardData.ts). The dashboard currently applies these example rules:

- Document Collection: 5-day SLA
- Underwriting: 10-day SLA
- Credit Committee: 3-day SLA
- An application is past SLA when its time in the current stage exceeds that stage's target
- A loan is at risk when it is past due, has a declining deposit trend, or has a covenant breach
- A disbursement is critical when conditions remain outstanding and the target date is within two days

The SLA thresholds and the reference date used by the sample calculations are placeholders and should be replaced with policy and live-system data before production use.

## Current Scope

Included: single-page dashboard, local sample data, reactive filtering, and responsive Vuetify layout.

Not yet included: live data integration, authentication, role-based access, automated notifications, export behavior, and historical trend analysis beyond the current sample view.
