# Playwright Automation Framework

A scalable end-to-end testing framework built with TypeScript and Microsoft Playwright.

## 🚀 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed (v18 or higher recommended).

### Installation
1. Clone this repository to your local machine.
2. Install the framework dependencies:
   ```bash
   npm install
   ```
3. Install the required automation browser binaries:
   ```bash
   npx playwright install
   ```

### ⚙️ Environment Configuration
1. Duplicate the template environment file:
   ```bash
   cp .env.example .env
   ```
2. Open the newly created `.env` file and fill in your target `BASE_URL` and credentials.

---

## 🛠️ Running Tests

You can execute tests using the configured shortcut scripts:


| Command | Description |
| :--- | :--- |
| `npm run test` | Runs all tests in headless background mode |
| `npm run test:headed` | Runs tests with a visible browser interface |
| `npm run test:ui` | Opens the interactive Playwright UI dashboard |
| `npm run test:report` | Serves the HTML test results report locally |

---

## 📁 Project Structure

* `tests/` — Test specification files (`*.spec.ts`).
* `pages/` — Page Object Models (POM) separating element locators from test logic.
* `fixtures/` — Custom global setup, teardown, and test dependencies.
* `playwright.config.ts` — Global runner parameters and browser configurations.
