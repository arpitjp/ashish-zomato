import { Typography, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';

const options = [
  { label: 'one' },
  { label: 'two' },
  { label: 'three' },
  { label: 'four' },
]

const radioOptions = [
  "one",
  "two",
  "three",
  "four"
]

export const Destination = ({ index }) => {
  const [value, setValue] = useState(null);
  const [radioValue, handleRadioValue] = useState(null);
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }}>
    <Typography>Destination {index}</Typography>
    <Autocomplete
      disablePortal
      value={value}
      getOptionLabel={(option) => option.label}
      onChange={(e, newValue) => setValue(newValue)}
      options={options}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} required variant='outlined' label="Movie" />}
    />
    {value && (
      <FormControl component="fieldset" required>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={radioValue} onChange={(e) => handleRadioValue(e.target.value)}>
          {radioOptions.map((val, index) => <FormControlLabel value={val} control={<Radio />} key={index} label={val} />)}
        </RadioGroup>
      </FormControl>
    )}
  </div>
}