import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';

import { Patient, Diagnosis, NewEntry } from '../../types';

import patientServise from '../../services/patients';

import PatientEntry from './EntryDetails/index';
import AddEntryModal from './EntryForm';
import { AxiosError } from 'axios';

const PatientPage = ({ diagnosis }: { diagnosis: Diagnosis[] }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setError(undefined);
    setModalOpen(false);
  };

  const submitNewEntry = async (entry: NewEntry) => {
    try {
      const addedEntry = await patientServise.addEntry(id as string, entry);
      setModalOpen(false);
      setError(undefined)
      if (patient !== undefined) {
        if (patient.entries) {
          setPatient({
            ...patient,
            entries: patient.entries.concat(addedEntry),
          });
        } else {
          setPatient({ ...patient, entries: [addedEntry] });
        }
      }
    } catch (e: unknown) {
      let errMsg = 'something went wrong. ';
      if (e instanceof AxiosError) {
        errMsg = e.response?.data;
      }
      setError(errMsg);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await patientServise.getOne(id as string);
        setPatient(res);
      } catch (e: unknown) {
        navigate('/');
      }
    })();
  }, [id, navigate]);

  return (
    <>
      <Typography variant='h4' style={{ marginTop: '0.5em' }}>
        <p>
          {patient?.name}
          {patient?.gender === 'male' ? (
            <Male />
          ) : patient?.gender === 'female' ? (
            <Female />
          ) : (
            <Transgender />
          )}
        </p>
      </Typography>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnosis={diagnosis}
      />
      <Button variant='contained' onClick={() => openModal()}>
        Add New Entry
      </Button>

      {patient?.entries?.length !== 0 && (
        <>
          <Typography variant='h5' style={{ marginTop: '0.5em' }}>
            <p>entries</p>
          </Typography>
          {patient?.entries?.map((e) => (
            <PatientEntry diagnosis={diagnosis} entry={e} key={e.id} />
          ))}
        </>
      )}
    </>
  );
};

export default PatientPage;
