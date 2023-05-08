import { Entry, Diagnosis } from '../../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const PatientEntry = ({
  diagnosis,
  entry,
}: {
  entry: Entry;
  diagnosis: Diagnosis[];
}) => {

  switch (entry.type) {
    case 'Hospital': {
      return <HospitalEntry entry={entry} diagnosis={diagnosis}/>;
    }
    case 'OccupationalHealthcare': {
      return <OccupationalHealthcareEntry entry={entry} diagnosis={diagnosis}/>;
    }
    case 'HealthCheck': {
      return <HealthCheckEntry entry={entry} diagnosis={diagnosis}/>;
    }
    default: {
      const exhustiveChecker:never = entry
      return exhustiveChecker
    }
  }
};

export default PatientEntry;
