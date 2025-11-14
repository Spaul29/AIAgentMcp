# Playwright Project

A Playwright automation testing project with Page Object Model (POM), Allure Reports, and GitHub Actions CI/CD integration.

## Features

- ✅ **Page Object Model** - Maintainable and scalable test structure
- ✅ **Allure Reports** - Comprehensive test reporting with trends and analytics
- ✅ **GitHub Actions** - Automated testing on every commit
- ✅ **TypeScript** - Type-safe test automation code
- ✅ **Environment Configuration** - Configurable base URL via .env
- ✅ **BDD Style** - Test steps for clear scenario documentation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (with UI):
```bash
npm run test:headed
```

Debug tests:
```bash
npm run test:debug
```

Run tests and generate Allure report:
```bash
npm run test:allure
```

Generate Allure report from existing results:
```bash
npm run allure:report
```

Open Allure report in browser:
```bash
npm run allure:open
```

Generate tests using Codegen:
```bash
npm run codegen
```

## GitHub Actions CI/CD

This project includes two automated workflows:

### 1. Main Test Workflow (`tests.yml`)
- **Triggers:** Push to `main`/`develop` branches and Pull Requests
- **Tests on:** Node 18.x and 20.x
- **Features:**
  - Automatic dependency caching
  - Allure and Playwright report generation
  - Artifact upload (30-day retention)
  - PR comments with test results

### 2. Scheduled Test Workflow (`scheduled-tests.yml`)
- **Triggers:** Daily at 2 AM UTC (configurable via cron)
- **Manual trigger:** Available via `workflow_dispatch`
- **Features:**
  - Automatic report generation
  - Artifact upload

## Reporting

### Allure Reports
Comprehensive test reporting with:
- Test execution history
- Detailed steps and logs
- Screenshots and artifacts
- Feature and story tracking
- Severity levels and trends

### Playwright Reports
Built-in HTML reports with test details and traces.

## Project Structure

```
.
├── .github/
│   ├── workflows/
│   │   ├── tests.yml              # Main CI/CD workflow
│   │   └── scheduled-tests.yml    # Scheduled tests
│   └── copilot-instructions.md    # Project documentation
├── tests/
│   ├── e2e/                       # End-to-end tests
│   ├── pages/                     # Page Object Model
│   ├── fixtures/                  # Test data
│   ├── utils/                     # Helper utilities
│   └── config/                    # Configuration
├── allure-results/                # Allure raw results (generated)
├── allure-report/                 # Allure HTML report (generated)
├── playwright-report/             # Playwright report (generated)
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── playwright.config.ts           # Playwright config
├── tsconfig.json                  # TypeScript config
└── package.json                   # Dependencies and scripts
```

## Environment Variables

Create a `.env` file (see `.env.example`):

```env
BASE_URL=https://www.saucedemo.com
```

## Best Practices

- Write tests in BDD style using `test.step()`
- Maintain Page Object Model structure
- Centralize test data in fixtures
- Add Allure annotations for reporting
- Keep selectors private
- Document all methods with JSDoc

## Contributing

1. Create a feature branch
2. Write/update tests
3. Run `npm run test:allure` locally
4. Commit and push
5. GitHub Actions automatically runs tests
6. Review PR artifacts and results
7. Merge after approval

## Troubleshooting

**Browser not found:**
```bash
npx playwright install
```

**Environment variables not loading:**
- Ensure `.env` file exists with correct variables

**Allure report not generated:**
- Check that tests completed successfully
- Run `npm run allure:report` manually

**GitHub Actions failure:**
- Check workflow logs in Actions tab
- Verify Node version compatibility
- Ensure all dependencies are listed in package.json

## Documentation Links

- [Playwright Documentation](https://playwright.dev)
- [Allure Documentation](https://docs.qameta.io/allure/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

