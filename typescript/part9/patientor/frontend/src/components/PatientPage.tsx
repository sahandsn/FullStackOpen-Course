import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Typography, Icon } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';

import { Patient, Diagnosis } from '../types';

import patientServise from '../services/patients';

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
          {patient?.name}{' '}
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
        <Fragment key={e.id}>
          <p>
            {e.date}: {e.description}
          </p>
          {e.diagnosisCodes && (
            <ul>
              {e.diagnosisCodes.map((c) => (
                <li key={c}>{c}: {diagnosis!.find(d => d.code === c)?.name}</li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default PatientPage;
