"use client";
import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    );
  }

  return (
    <Button variant="outlined" color="success" onClick={() => signIn("github")}>
      Sign in with Github
    </Button>
  );
}
