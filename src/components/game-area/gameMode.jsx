import React, { useState } from 'react';
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { DESTINATIONS } from '../../constants';
import { Destination } from './destination';

const useStyles = makeStyles(() => ({
  allDestinationsContainer: {
    marginTop: '32px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  }
}));

export const GameMode = ({
  mutate,
  setMode,
  planets,
  vehicles,
  selectedData,
  setSelectedData,
  submitEnabled,
}) => {
  const classes = useStyles();

  const [planetData, setPlanetData] = useState(planets);
  const [vehicleData, setVehicleData] = useState(vehicles);


  // event handlers
  const getTimeTaken = (index, newSelectedData) => {
    if (!newSelectedData["planet_names"][index] || !newSelectedData["vehicle_names"][index]) return 0;
    const planetDistance = planetData[index].distance;
    const speed = vehicleData[index].speed;
    return planetDistance / speed;
  }

  const handlePlanetSelection = (index, newValue) => {
    const prevValue = selectedData["planet_names"]?.[index];

    // change selectedData
    const newSelectedData = structuredClone(selectedData);
    newSelectedData["planet_names"][index] = newValue;
    newSelectedData["time_taken"][index] = getTimeTaken(index, newSelectedData);
    setSelectedData(newSelectedData);

    // change available planets
    const newPlanetData = structuredClone(planetData);
    newPlanetData.forEach(obj => {
      if (obj.name === prevValue) {
        obj.available++;
      } else if (obj.name === newValue) {
        obj.available--;
      }
    });
    setPlanetData(newPlanetData);
  }

  const handleVehicleSelection = (index, newValue) => {
    const prevValue = selectedData["vehicle_names"]?.[index];

    // change selectedData
    const newSelectedData = structuredClone(selectedData);
    newSelectedData["vehicle_names"][index] = newValue;
    newSelectedData["time_taken"][index] = getTimeTaken(index, newSelectedData);
    setSelectedData(newSelectedData);

    // change available vehicles
    const newVehicleData = structuredClone(vehicleData);
    newVehicleData.forEach(obj => {
      if (obj.name === prevValue) {
        obj.available++;
      } else if (obj.name === newValue) {
        obj.available--;
      }
    });
    setVehicleData(newVehicleData);
  }

  const handleSubmit = () => {
    setMode('result');
    mutate(selectedData);
  }

  // rendering logic
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '40px',
  }}>
    <div className={classes.allDestinationsContainer}>
      {DESTINATIONS.map((i) => <Destination
        key={i}
        index={i}
        planet={selectedData["planet_names"][i]}
        handlePlanetSelection={(newVal) => handlePlanetSelection(i, newVal)}
        planetData={planetData}
        vehicle={selectedData["vehicle_names"][i]}
        handleVehicleSelection={(newVal) => handleVehicleSelection(i, newVal)}
        vehicleData={vehicleData}
      />)}
    </div>
    <div title={submitEnabled ? '' : 'Fill all the required fields'}>
      <Button
        variant="outlined"
        size="small"
        disabled={!submitEnabled}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  </div>
}