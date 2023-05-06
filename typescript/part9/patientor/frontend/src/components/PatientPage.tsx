import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Icon } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';

import { Patient } from '../types';

import patientServise from '../services/patients';

const PatientPage = () => {
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
        <p>{patient?.name} {patient?.gender==='male' ? <Male /> : patient?.gender==='female' ?<Female />: <Transgender />}</p>
      </Typography>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </>
  );
};

export default PatientPage;
