"use client";
import CloseIcon from "@mui/icons-material/Close";
import {
  Fade,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";

export default function RepoSearch({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<string>;
}) {
  const clearText = () => {
    setSearch("");
  };

  const clearAvailable = search.length > 0;

  return (
    <Stack>
      <TextField
        label="Search Repos"
        placeholder="Search by Repository Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Fade in={clearAvailable}>
                  <IconButton onClick={clearText}>
                    <CloseIcon />
                  </IconButton>
                </Fade>
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
}
