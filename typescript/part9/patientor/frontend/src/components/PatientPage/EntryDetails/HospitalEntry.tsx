import { HospitalEntry as HospitalEntryType, Diagnosis } from '../../../types';
import HealingIcon from '@mui/icons-material/Healing';

const HospitalEntry = ({
  diagnosis,
  entry,
}: {
  entry: HospitalEntryType;
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
      <p>{entry.date} <HealingIcon/></p>
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
      {entry.discharge && (
        <ul>
        <li style={{listStyleType:'circle'}}>discharge date: {entry.discharge.date}</li>
        <li style={{listStyleType:'circle'}}>discharge criteria: {entry.discharge.criteria}</li>
      </ul>
      )}
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntry;
