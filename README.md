# QA Automation Challenge - DemoBlaze

This repository contains the automation framework and test scripts for the QA Automation Challenge.

## Framework Overview

The framework is built using **Playwright** with **TypeScript**. It follows the **Page Object Model (POM)** design pattern to ensure modularity, maintainability, and scalability.

### Structure
- `src/pages/`: Contains Page Object classes (HomePage, LoginPage, CartPage, etc.) encapsulating web elements and interactions.
- `src/tests/`: Contains test specifications (`login.spec.ts`, `cart.spec.ts`).
- `src/utils/`: Utility helper classes (e.g., `UserHelper` for test data generation).
- `playwright.config.ts`: Configuration for browsers, reporting, and execution options.
- `.github/workflows/`: CI/CD configuration for GitHub Actions.

## Setup and Execution

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   npx playwright install --with-deps
   ```

### Running Tests
To run all tests (headless mode by default):
```bash
npx playwright test
```

To run a specific test file:
```bash
npx playwright test src/tests/login.spec.ts
```

To run tests in headed mode (visible browser):
```bash
npx playwright test --headed
```

### Viewing Reports
This project uses **Smart Reporter** for enhanced reporting.

After execution, view the report:
```bash
open src/tests/smart-report.html
```

Or view the standard Playwright HTML report:
```bash
npx playwright show-report
```

## Features
- **Smart Reporting**: Interactive trends, stability scores, and failure analysis.
- **CI Persistence**: GitHub Actions workflow caches `test-history.json` to track flakiness over time.
- **Test Coverage**:
  - **Login**: Verifies successful login (created dynamically) and failure scenarios.
  - **Cart & Order**: Verifies the flow of browsing, adding to cart, and purchasing.
