import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType, Diagnosis } from '../../../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntry = ({
  diagnosis,
  entry,
}: {
  entry: OccupationalHealthcareEntryType;
  diagnosis: Diagnosis[];
}) => {
  const patientEntryCSS = {
    border: '1px black solid',
    marginBottom: '5px',
    borderRadius: '3px',
    padding: '3px',
  };
  return (
    <div key={entry.id} style={patientEntryCSS}>
      <p>{entry.date} <WorkIcon/> {entry.employerName}</p>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((c) => (
            <li key={c}>
              {c}: {diagnosis!.find((d) => d.code === c)?.name}
            </li>
          ))}
        </ul>
      )}
      {entry.sickLeave && (
        <ul>
          <li style={{listStyleType:'circle'}}>leave start: {entry.sickLeave.startDate}</li>
          <li style={{listStyleType:'circle'}}>leave end: {entry.sickLeave.endDate}</li>
        </ul>
      )}
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntry;
