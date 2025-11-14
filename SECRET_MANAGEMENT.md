# Secret Management Guide

## Overview

This project implements secure secret management for GitHub Personal Access Token (PAT) with support for both local development and CI/CD environments.

## Secret Priority

The application follows this priority order to load secrets:

1. **GitHub Actions Secrets** (CI/CD environment)
2. **.env file** (Local development)
3. **Default/Empty** (if not configured)

## Local Development Setup

### Step 1: Add GitHub PAT to .env

1. Open `.env` file in your project root
2. Add your GitHub Personal Access Token:

```env
BASE_URL=https://www.saucedemo.com
GH_PAT=ghp_xxxxxxxxxxxxxxxxxxxx
```

**Important:** Use `GH_PAT` (not `GITHUB_PAT`) - GitHub reserves the `GITHUB_*` prefix for its own secrets.

### Step 2: Protect Your .env File

The `.env` file is already in `.gitignore`, so it won't be committed to the repository.

**Important:** Never commit `.env` file with real secrets!

## CI/CD Setup (GitHub Actions)

### Step 1: Create GitHub Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GH_PAT` (⚠️ Must be `GH_PAT`, NOT `GITHUB_PAT` - GitHub reserves `GITHUB_*` prefix)
5. Value: Your GitHub Personal Access Token
6. Click **Add secret**

### Step 2: Verify Workflow Configuration

The workflows are already configured to use the secret:

```yaml
- name: Run Playwright tests
  env:
    GH_PAT: ${{ secrets.GH_PAT }}
    CI: true
  run: npm test
```

The `CI: true` flag helps the application identify that it's running in a CI environment.

## How It Works

### Configuration Loading (`tests/config/config.ts`)

```typescript
export const config = {
  // GitHub PAT - Read from environment variable (set by GitHub Actions)
  // or from .env file (local development)
  githubPat: process.env.GITHUB_PAT || '',
  
  // Detect CI environment
  isCIEnvironment: !!process.env.CI || !!process.env.GITHUB_ACTIONS,
};
```

### Configuration Validation

Before running tests, the configuration is validated:

```typescript
validateConfig(); // Called in test files
```

This function:
- Checks if `BASE_URL` is configured
- Warns if `GITHUB_PAT` is missing in CI environment
- Warns if `GITHUB_PAT` is missing in local development

## Creating a GitHub PAT Token

### Step 1: Generate Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token (classic)**
3. Give it a name (e.g., "AIAgentMcp Tests")
4. Select scopes:
   - `repo` - Full control of private repositories
   - `workflow` - Update GitHub Action workflows (if needed)
5. Click **Generate token**
6. **Copy the token immediately** (you won't see it again)

### Step 2: Store Securely

- **Local:** Paste in `.env` file (don't commit!)
- **CI/CD:** Add to GitHub Secrets

### Step 3: Rotate Regularly

- Delete old tokens after creating new ones
- Regenerate tokens if accidentally exposed
- GitHub will notify you of exposed tokens

## Usage in Tests

Access the token in your tests:

```typescript
import { config } from '../config/config';

// In test file
const token = config.githubPat;

// Use token for API calls or GitHub interactions
if (config.githubPat) {
  // Perform GitHub API operations
} else {
  console.warn('GitHub PAT not configured');
}
```

## Security Best Practices

✅ **Do:**
- Store PAT in GitHub Secrets for CI/CD
- Store PAT in `.env` for local development
- Rotate tokens regularly
- Use minimal required scopes
- Keep `.env` in `.gitignore`
- Use strong, unique tokens

❌ **Don't:**
- Commit `.env` file to repository
- Share tokens via chat or email
- Use personal access tokens in logs
- Hardcode secrets in source code
- Use the same token everywhere

## Troubleshooting

### Token not loading in local development

1. Verify `.env` file exists in project root
2. Check token format: `GITHUB_PAT=ghp_xxxxx`
3. Restart your terminal/IDE
4. Verify dotenv is installed: `npm list dotenv`

### Token not loading in CI/CD

1. Go to Repository Settings → Secrets
2. Verify `GITHUB_PAT` secret exists
3. Check workflow file uses correct secret name: `${{ secrets.GITHUB_PAT }}`
4. Ensure `CI: true` is set in workflow

### Validation warnings

If you see warnings:

```
⚠️  GITHUB_PAT is not configured in CI environment
```

**Local:** Add token to `.env` file  
**CI/CD:** Add `GITHUB_PAT` to GitHub Secrets

## Testing Secret Loading

Run tests locally:

```bash
npm test
```

Check logs for:
- ✅ Configuration loaded successfully
- ⚠️  Warnings about missing secrets
- ❌ Errors if BASE_URL is missing
