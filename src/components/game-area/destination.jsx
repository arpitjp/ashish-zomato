import { Typography, TextField, FormControl, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useMemo, useState } from 'react';

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

export const Destination = ({
  index,
  planet,
  handlePlanetSelection,
  planetData,
  vehicle,
  handleVehicleSelection,
  vehicleData,
}) => {
  const planetDistance = planetData?.[index]?.distance;
  const planetOptions = useMemo(() => planetData?.filter(obj => obj.available).map(obj => obj.name), [planetData]);

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  }}>
    <Typography>Destination {index}</Typography>
    <Autocomplete
      disablePortal
      value={planet}
      onChange={(e, newValue) => {
        handlePlanetSelection(newValue)
      }}
      options={planetOptions}
      style={{ width: 250 }}
      size="small"
      renderInput={(params) => <TextField {...params} required variant='outlined' label="Movie" />}
    />
    {planet && (
      <FormControl component="fieldset" required>
        <RadioGroup value={vehicle} onChange={(e) => handleVehicleSelection(e.target.value)}>
          {vehicleData.map((obj, index) => {
            const unReachable = obj.max_distance < planetDistance;
            const disabled = !obj.available || unReachable;
            const label = `${obj.name} (${obj.available})${unReachable ? ' (Not enough range)' : ''}`;
            return <FormControlLabel value={obj.name} label={label} disabled={disabled} control={<Radio />} key={index} />
          })}
        </RadioGroup>
      </FormControl>
    )}
  </div>
}