"use client";
import { Backdrop, CircularProgress } from "@mui/material";

export default function LoadingModal({ isLoading }: { isLoading: boolean }) {
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
