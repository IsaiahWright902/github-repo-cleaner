"use client";
import { GithubRepo } from "@/types/types";
import { Stack, Box, Chip, Link, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { deleteRepository, fetchUserRepos } from "@/lib/github";
import { useSession } from "next-auth/react";
import RepoSearch from "./RepoSearch";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function RepoList() {
  const session = useSession();
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GithubRepo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleRowSelectionChange = (value: any) => {
    setSelectedRows(value.ids);
  };

  const handleDelete = async () => {
    await Promise.all(
      [...selectedRows].map((fullName) =>
        deleteRepository(session.data?.accessToken!, fullName)
      )
    );
    selectedRows.forEach(async (row) => {
      await deleteRepository(session.data?.accessToken!, row);
    });

    await handleGetRepos();
  };

  const handleGetRepos = async () => {
    setRepos(await fetchUserRepos(session.data?.accessToken!));
  };

  useEffect(() => {
    if (session) {
      if (repos.length == 0) {
        handleGetRepos();
      }
    }
  }, [session]);

  useEffect(() => {
    if (repos) {
      const normalizedSearch = search.toLowerCase();
      setFilteredRepos(
        repos.filter((x) => {
          const matchesSearch = x.name.toLowerCase().includes(normalizedSearch);
          return matchesSearch;
        })
      );
    }
  }, [repos, search]);

  useEffect(() => {
    setRows(
      filteredRepos.map((repo) => ({
        id: repo.full_name,
        repoName: repo.name,
        description: repo.description,
        created: repo.created_at,
        lastModified: repo.updated_at,
        private: repo.private,
        url: repo.html_url,
        language: repo.language,
        forked: repo.fork,
      }))
    );
  }, [filteredRepos]);

  const columns: GridColDef[] = [
    {
      field: "repoName",
      headerName: "Repo Name",
      flex: 0.9,
      renderCell: (params) => (
        <Link
          href={params.row.url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          onClick={(e) => {
            // Prevent the row selection when clicking the link
            e.stopPropagation();
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "owner",
      headerName: "Owner",
      flex: 0.5,
      hideable: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.5,
      hideable: true,
      valueFormatter: (value) => (value ? value : "No Description"),
    },
    {
      field: "created",
      headerName: "Created",
      flex: 0.5,
      valueFormatter: (value) => formatDate(value),
    },
    {
      field: "lastModified",
      headerName: "Last Modified",
      flex: 0.5,
      valueFormatter: (value) => formatDate(value),
    },
    {
      field: "language",
      headerName: "Language",
      flex: 0.5,
      valueFormatter: (value) => (value ? value : "unknown"),
    },
    {
      field: "private",
      headerName: "Visibility",
      flex: 0.5,
      renderCell: (params) => (
        <Chip
          sx={{ color: "white" }}
          label={params.value ? "Private" : "Public"}
          color={params.value ? "error" : "success"}
          size="small"
        />
      ),
    },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <Stack spacing={3}>
        <RepoSearch search={search} setSearch={setSearch} />
        <Box overflow="auto" height="70vh">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
            density="compact"
            disableVirtualization={true}
            onRowSelectionModelChange={handleRowSelectionChange}
          />
        </Box>
        <Stack justifyContent="center">
          <Button
            disabled={selectedRows.size === 0}
            variant="contained"
            color="error"
            onClick={() => setOpen(true)}
          >
            Delete Selected Repos
          </Button>
        </Stack>
      </Stack>
      <ConfirmDeleteModal
        open={open}
        handleClose={handleClose}
        repoNames={selectedRows}
        permanentlyDelete={handleDelete}
      />
    </>
  );
}
