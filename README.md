# GitHub Repo Cleaner

A simple tool to bulk delete old or unused repositories from your GitHub account.  
Authentication is handled via GitHub SSO using a GitHub OAuth App that you configure.
![image](https://github.com/user-attachments/assets/e007911b-abf1-4410-a23a-7ec5c3c7521c)

## Features
- Bulk select and delete repositories from your GitHub account
- Authenticate using GitHub SSO via your own OAuth App
- Environment variables can be entered interactively on first run

## Warning

This tool **permanently deletes GitHub repositories**. Once a repository is deleted, it **cannot be recovered**.

Because of the destructive nature of this action, you are required to configure your **own GitHub OAuth App**. This ensures that:

- You understand and take full responsibility for the access being granted.
- Your GitHub credentials and OAuth configuration remain private.
- The tool only has access to the repositories under your account or organization that you explicitly authorize.

**Use this tool with caution.** Review the list of repositories carefully before proceeding with deletion.

## Getting Started
- Set up Github OAuth application:
  - Go to GitHub Developer Settings: https://github.com/settings/developers
  - Create a new OAuth App
  - Set the Homepage URL to http://localhost:3000
  - Set the Authorization callback URL to http://localhost:3000/api/auth/callback/github
  - Save your `Client Id` and `Client Secret`    
- Install/Setup:
  - Clone this repo
  - run `npm i` in the directory you cloned it in
  - run `npm run start-cleaner` - this will check if you have a .env.local file. If you do not it will automatically create one and ask for your input.
- Env Variables:
  - NEXTAUTH_URL: Leave as https://localhost:3000
  - NEXTAUTH_SECRET: Copy generated value from one of the commands below
      - Node: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
      - Bash: `openssl rand -hex 32`
  - GITHUB_CLIENT_ID: Your Github OAuth Client Id
  - GITHUB_CLIENT_SECRET: Your Github OAuth Client Secret
- Open in browser:
  - Open http://localhost:3000 in your browser
  - Log in though Github OAuth
  - Clean dem repos!
 
## Starting Applicaiton after Init
- You can use either of these commands
    - `npm run dev`
    - `npm run start-cleaner`
  
