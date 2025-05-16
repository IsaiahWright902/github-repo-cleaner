"use client";

import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
import AuthButton from "../AuthButton/AuthButton";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export default function DashboardNav() {
  const session = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            {session && (
              <Stack flexDirection="row" alignItems="center">
                {" "}
                <Avatar alt="Remy Sharp" src={session.data?.user?.image!} />
                <Typography variant="h5" pl={1}>
                  {session.data?.user?.name} - Github Repo Cleaner
                </Typography>
              </Stack>
            )}

            <AuthButton />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
