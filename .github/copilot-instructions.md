<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a Playwright test automation project with Page Object Model (POM) pattern and Allure Reports integration.

### Technology Stack

- **Playwright** - Browser automation framework
- **TypeScript** - Language for type-safe code
- **Allure Reports** - Test reporting framework
- **GitHub Actions** - CI/CD pipeline

### Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── tests.yml                 # Main test workflow (runs on push/PR)
│       └── scheduled-tests.yml       # Scheduled tests (daily at 2 AM UTC)
├── tests/
│   ├── e2e/                          # End-to-end test files
│   ├── pages/                        # Page Object Model classes
│   ├── fixtures/                     # Test data and fixtures
│   ├── utils/                        # Helper utilities
│   └── config/                       # Configuration files
├── allure-results/                   # Allure raw results (generated)
├── allure-report/                    # Allure HTML report (generated)
├── playwright-report/                # Playwright HTML report (generated)
├── .env                              # Environment variables
├── .env.example                      # Environment template
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts

```

### Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Configure `.env` file with `BASE_URL`
4. Run `npx playwright install` to install browsers

### Running Tests

- `npm test` - Run all tests
- `npm run test:headed` - Run tests with browser UI
- `npm run test:debug` - Debug tests
- `npm run test:allure` - Run tests and generate Allure report
- `npm run allure:open` - Open Allure report

### GitHub Actions Workflows

#### 1. Main Test Workflow (tests.yml)
- **Triggers:** Push to main/develop, Pull Requests
- **Features:**
  - Tests on Node 18.x and 20.x
  - Automatic dependency caching
  - Playwright browsers installation
  - Allure and Playwright report generation
  - Artifact uploads for 30 days
  - PR comments with test results

#### 2. Scheduled Test Workflow (scheduled-tests.yml)
- **Triggers:** Daily at 2 AM UTC (configurable)
- **Features:**
  - Manual trigger via workflow_dispatch
  - Report generation and upload
  - Headed mode execution

### Best Practices

- Write tests following BDD style using `test.step()`
- Use Page Object Model for maintainability
- Centralize test data in fixtures
- Add Allure annotations for better reporting
- Keep selectors as private properties
- Document methods with JSDoc comments

### Common Commands

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run tests
npm test
npm run test:headed
npm run test:debug

# Reporting
npm run test:allure
npm run allure:report
npm run allure:open

# Code generation
npm run codegen
```

### Contributing

1. Create a feature branch
2. Write or update tests
3. Run `npm run test:allure` locally
4. Commit and push to create a PR
5. GitHub Actions will automatically run tests
6. Review artifacts and test results
7. Merge after approval

### Troubleshooting

- **Browser not found:** Run `npx playwright install`
- **Environment variables missing:** Create `.env` file from `.env.example`
- **Allure report not generated:** Ensure tests ran successfully with `npm run test:allure`
- **GitHub Actions timeout:** Increase timeout-minutes in workflow file

### Documentation Links

- [Playwright Docs](https://playwright.dev)
- [Allure Docs](https://docs.qameta.io/allure/)
- [GitHub Actions](https://docs.github.com/en/actions)
