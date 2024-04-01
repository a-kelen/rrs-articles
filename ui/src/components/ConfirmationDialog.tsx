import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export interface ConfirmationDialogProps {
  id: string;
  open: boolean;
  onClose: (id: string | null) => void;
}

export default function ConfirmationDialog({
  id,
  open,
  onClose,
}: ConfirmationDialogProps) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => onClose(null)}>
        <DialogTitle>Delete this article?</DialogTitle>
        <DialogActions>
          <Button onClick={() => onClose(null)}>Close</Button>
          <Button color="error" onClick={() => onClose(id)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
