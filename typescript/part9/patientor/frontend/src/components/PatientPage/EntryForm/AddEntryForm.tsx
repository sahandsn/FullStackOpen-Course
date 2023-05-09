import { useState, SyntheticEvent } from 'react';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Divider,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormControl,
} from '@mui/material';

import {
  Type,
  NewEntry,
  HealthCheckRating,
  Diagnosis,
  HealthCheckRatingString,
} from '../../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewEntry) => void;
  diagnosis: Diagnosis[];
}

interface TypeOption {
  value: Type;
  label: string;
}
interface HealthCheckRatingOption {
  value: HealthCheckRatingString;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(Type).map((v) => ({
  value: v,
  label: v.toString(),
}));
const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.entries(
  HealthCheckRatingString
).map(([key, val]) => {
  return {
    value: val,
    label: key,
  };
});

const AddEntryForm = ({ onCancel, onSubmit, diagnosis }: Props) => {
  const [type, setType] = useState<
    'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'
  >('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: '' });
  const [employerName, setEmployerName] = useState('');

  const [discharge, setDischarge] = useState({ date: '', criteria: '' });

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(Type).find((t) => t.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };
  const onHealthCheckRatingChange = (
    event: SelectChangeEvent<HealthCheckRating>
  ) => {
    event.preventDefault();
    const value = event.target.value;
    switch (value) {
      case '0': {
        setHealthCheckRating(HealthCheckRating.Healthy);
        break;
      }
      case '1': {
        setHealthCheckRating(HealthCheckRating.LowRisk);
        break;
      }
      case '2': {
        setHealthCheckRating(HealthCheckRating.HighRisk);
        break;
      }
      case '3': {
        setHealthCheckRating(HealthCheckRating.CriticalRisk);
        break;
      }
      default: {
        setHealthCheckRating(HealthCheckRating.Healthy);
        break;
      }
    }
  };
  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      setDiagnosisCodes([event.target.value]);
    } else {
      setDiagnosisCodes(event.target.value);
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    switch (type) {
      case 'HealthCheck': {
        const HealthCheckData = {
          ...data,
          healthCheckRating,
        };
        onSubmit(HealthCheckData);
        break;
      }
      case 'OccupationalHealthcare': {
        const OccupationalHealthcareData = {
          ...data,
          sickLeave,
          employerName,
        };
        onSubmit(OccupationalHealthcareData);
        break;
      }
      case 'Hospital': {
        const HospitalData = {
          ...data,
          discharge,
        };
        onSubmit(HospitalData);
        break;
      }
      default: {
        onSubmit(data);
      }
    }
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <FormControl margin='dense' fullWidth>
          <InputLabel id='select-type-label'>Type</InputLabel>
          <Select
            input={<OutlinedInput label='Type' />}
            labelId='select-type-label'
            fullWidth
            value={type}
            onChange={onTypeChange}
            margin='dense'
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider
          style={{
            background: '#eae8e4',
            height: '2px',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          variant='middle'
        />

        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          margin='dense'
        />

        <TextField
          type='date'
          fullWidth
          InputLabelProps={{ shrink: true }}
          label='Entry date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
          margin='dense'
        />

        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          margin='dense'
        />

        <FormControl margin='dense' fullWidth>
          <InputLabel id='select-diagnosisCodes-label'>Diagnosis</InputLabel>
          <Select
            labelId='select-diagnosisCodes-label'
            id='select-diagnosisCodes'
            input={<OutlinedInput label='Diagnosis' />}
            multiple
            fullWidth
            renderValue={(selected) => selected.join('- ')}
            value={diagnosisCodes}
            onChange={onDiagnosisCodesChange}
          >
            {diagnosis.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                <Checkbox checked={diagnosisCodes.indexOf(option.code) > -1} />
                <ListItemText primary={option.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider
          style={{
            background: '#eae8e4',
            height: '2px',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          variant='middle'
        />

        {type === 'HealthCheck' && (
          <FormControl margin='dense' fullWidth>
            <InputLabel id='select-healthCheckRating-label'>
              Health Check Rating
            </InputLabel>
            <Select
              input={<OutlinedInput label='Health Check Rating' />}
              labelId='select-healthCheckRating-label'
              margin='dense'
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {type === 'Hospital' && (
          <>
            <TextField
              label='Discharge Date'
              InputLabelProps={{ shrink: true }}
              fullWidth
              type='date'
              value={discharge.date}
              onChange={({ target }) =>
                setDischarge((prev) => ({ ...prev, date: target.value }))
              }
              margin='dense'
            />
            <TextField
              label='Discharge Criteria'
              fullWidth
              value={discharge.criteria}
              onChange={({ target }) =>
                setDischarge((prev) => ({ ...prev, criteria: target.value }))
              }
              margin='dense'
            />
          </>
        )}

        {type === 'OccupationalHealthcare' && (
          <>
            <TextField
              label='Employer name'
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              margin='dense'
            />

            <InputLabel>Sick leave</InputLabel>
            <TextField
              label='Start'
              InputLabelProps={{ shrink: true }}
              fullWidth
              type='date'
              value={sickLeave.startDate}
              onChange={({ target }) =>
                setSickLeave((prev) => ({ ...prev, startDate: target.value }))
              }
              margin='dense'
            />
            <TextField
              label='End'
              InputLabelProps={{ shrink: true }}
              fullWidth
              type='date'
              value={sickLeave.endDate}
              onChange={({ target }) =>
                setSickLeave((prev) => ({ ...prev, endDate: target.value }))
              }
              margin='dense'
            />
          </>
        )}

        <Grid margin='1rem'>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
