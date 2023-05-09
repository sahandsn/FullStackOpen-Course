import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddPatientForm from "./AddEntryForm";
import { NewEntry, Diagnosis } from "../../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: NewEntry) => void;
  error?: string;
  diagnosis: Diagnosis[]
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnosis }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} diagnosis={diagnosis}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
