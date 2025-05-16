"use client";

import { Paper, Stack, Typography } from "@mui/material";
import AuthButton from "../AuthButton/AuthButton";

export default function LoginDisplay() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Paper elevation={3}>
        <Stack padding="4rem" spacing={3} alignItems="flex-start">
          <Typography variant="h4">Github Repo Cleaner</Typography>
          <Typography variant="body1">
            Easily manage your GitHub repositories and bulk-delete those you no
            longer need. This application uses{" "}
            <a
              target="_blank"
              href="https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps"
            >
              OAuth
            </a>{" "}
            to securely authenticate with your GitHub account and fetch your
            repository list. To use this tool, you'll need to configure your own
            OAuth application. Please follow the setup instructions provided in{" "}
            <a
              target="_blank"
              href="https://github.com/IsaiahWright902/github-repo-cleaner"
            >
              this repository
            </a>{" "}
            to complete the configuration properly.
          </Typography>
          <Typography variant="body2" color="error">
            This application will permanently delete the repositories you
            select. Use this tool at your own discretion.
          </Typography>
          <AuthButton />
        </Stack>
      </Paper>
    </div>
  );
}
