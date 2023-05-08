import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';

import { Patient, Diagnosis } from '../../types';

import patientServise from '../../services/patients';

import EntryDetails from "./EntryDetails/index"
import PatientEntry from './EntryDetails/index';

const PatientPage = ({ diagnosis }: { diagnosis: Diagnosis[] }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  

  useEffect(() => {
    (async () => {
      const res = await patientServise.getOne(id as string);
      setPatient(res);
    })();
  }, []);
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
      {patient?.entries?.length !== 0 && (
        <Typography variant='h5' style={{ marginTop: '0.5em' }}>
          <p>entries</p>
        </Typography>
      )}

      {patient?.entries?.map((e) => (
        <PatientEntry  diagnosis={diagnosis} entry={e} key={e.id}/>
      ))}
    </>
  );
};

export default PatientPage;
