# GitHub Repo Cleaner

A simple tool to bulk delete old or unused repositories from your GitHub account.  
Authentication is handled via GitHub SSO using a GitHub OAuth App that you configure.
![image](https://github.com/user-attachments/assets/e007911b-abf1-4410-a23a-7ec5c3c7521c)

## Features
- Bulk select and delete repositories from your GitHub account
- Authenticate using GitHub SSO via your own OAuth App
- Environment variables can be entered interactively on first run
- Only returns repos you own

## Warning

This tool **permanently deletes GitHub repositories**. Once a repository is deleted, it **cannot be recovered**.

Because of the destructive nature of this action, you are required to configure your **own GitHub OAuth App**. This ensures that:

- You understand and take full responsibility for the access being granted.
- Your GitHub credentials and OAuth configuration remain private.
- The tool only has access to the repositories under your account or organization that you explicitly authorize.

**Use this tool with caution.** Review the list of repositories carefully before proceeding with deletion.

## Getting Started

- **Set up GitHub OAuth application:**
  - Go to GitHub Developer Settings: https://github.com/settings/developers
  - Create a new OAuth App
  - Set the Homepage URL to: `http://localhost:3000`
  - Set the Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
  - Save your `Client ID` and `Client Secret`

- **Install / Setup:**
  - Clone this repo:
    ```bash
    git clone https://github.com/IsaiahWright902/github-repo-cleaner.git
    cd github-repo-cleaner
    ```
  - Install dependencies:
    ```bash
    npm install
    ```
  - Run the tool:
    ```bash
    npm run start-cleaner
    ```
    This will check for a `.env.local` file. If it doesn't exist, the script will prompt you to enter values and create the file automatically.

- **Environment Variables:**

  | Variable              | Description                                |
  |-----------------------|--------------------------------------------|
  | `NEXTAUTH_URL`        | Leave as `http://localhost:3000`          |
  | `NEXTAUTH_SECRET`     | Secure random string (see below)          |
  | `GITHUB_CLIENT_ID`    | Your GitHub OAuth App Client ID           |
  | `GITHUB_CLIENT_SECRET`| Your GitHub OAuth App Client Secret       |

  **Generate `NEXTAUTH_SECRET`:**
  - Using Node:
    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```
  - Using Bash / OpenSSL:
    ```bash
    openssl rand -hex 32
    ```

- **Open in browser:**
  - Visit `http://localhost:3000`
  - Log in through GitHub OAuth
  - Clean dem repos!

---

## Starting the Application After Initial Setup

Once the environment is configured, you can start the app with either of the following:

```bash
npm run dev
```

or

```bash
npm start-cleaner
```
