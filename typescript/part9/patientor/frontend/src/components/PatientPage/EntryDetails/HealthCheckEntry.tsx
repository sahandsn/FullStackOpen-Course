import {
  HealthCheckEntry as HealthCheckEntryType,
  Diagnosis,
} from '../../../types';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// import FavoriteIcon from '@mui/icons-material/Favorite';

import HealthRatingBar from '../../HealthRatingBar';
import { Typography } from '@mui/material';

const HealthCheckEntry = ({
  diagnosis,
  entry,
}: {
  entry: HealthCheckEntryType;
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
      <p>
        {entry.date} <HealthAndSafetyIcon />
      </p>
      <p>{entry.description}</p>
      {/* <FavoriteIcon style={{color:'red', opacity:`${1 - (entry.healthCheckRating * 0.3)}`}}/> */}
      <HealthRatingBar showText={false} rating={entry.healthCheckRating}/>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((c) => (
            <li key={c}>
              {c}: {diagnosis!.find((d) => d.code === c)?.name}
            </li>
          ))}
        </ul>
      )}
      <p>diagnosed by {entry.specialist}</p>
    </div>
    
  );
};

export default HealthCheckEntry;
