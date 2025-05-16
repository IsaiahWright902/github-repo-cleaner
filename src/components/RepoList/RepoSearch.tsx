"use client";
import { Stack, TextField, Typography } from "@mui/material";

export default function RepoSearch({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<string>;
}) {
  return (
    <Stack>
      <TextField
        label="Search Repos"
        placeholder="Search by Repository Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
      />
    </Stack>
  );
}
