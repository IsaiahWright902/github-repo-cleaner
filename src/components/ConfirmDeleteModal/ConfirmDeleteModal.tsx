"use client";

import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmDeleteModal({
  open,
  handleClose,
  repoNames,
  permanentlyDelete,
}: {
  open: boolean;
  handleClose: React.Dispatch<boolean>;
  repoNames: Set<string>;
  permanentlyDelete: React.Dispatch<void>;
}) {
  const [firstConfirmation, setFirstConfirmation] = useState<boolean>(false);

  const handleCloseClick = () => {
    setFirstConfirmation(false);
    handleClose(false);
  };

  const handleConfirmDelete = () => {
    handleCloseClick();
    permanentlyDelete();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseClick}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {!firstConfirmation ? (
              <>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  color="error"
                >
                  CONFIRM DELETE
                </Typography>
                <Stack spacing={2}>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete these repositories? This
                    action is permanent and cannot be undone.
                  </Typography>

                  <Button
                    sx={{ color: "white" }}
                    variant="contained"
                    color="success"
                    onClick={() => setFirstConfirmation(true)}
                  >
                    Yes, I want to proceed.
                  </Button>
                  <Button
                    onClick={handleCloseClick}
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  color="error"
                >
                  LAST WARNING
                </Typography>
                <Stack spacing={2}>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    The following repos will be deleted:
                  </Typography>
                  <Box maxHeight={300} overflow="auto" pb={1}>
                    {[...repoNames].map((name, idx) => (
                      <Typography variant="subtitle2" key={idx}>
                        {name}
                      </Typography>
                    ))}
                  </Box>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleConfirmDelete}
                  >
                    Permanently Delete Repositories
                  </Button>
                  <Button
                    sx={{ color: "white" }}
                    onClick={handleCloseClick}
                    variant="contained"
                    color="success"
                  >
                    Cancel
                  </Button>
                </Stack>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
