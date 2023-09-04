import React, { useMemo, useState } from 'react';
import { Button, CircularProgress, Tooltip, Typography } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { useGetData } from "../../hooks/useGetData"
import { makeStyles } from '@material-ui/core/styles';
import { DESTINATIONS } from '../../constants';
import { Destination } from './destination';

const useStyles = makeStyles(() => ({
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    margin: '32px 0px'
  },
  allDestinationsContainer: {
    marginTop: '32px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  }
}));

const AllDestinations = ({ planets, vehicles }) => {
  // hooks
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState({
    "planet_names": [...Array(DESTINATIONS.length)],
    "vehicle_names": [...Array(DESTINATIONS.length)],
    "time_taken": [...Array(DESTINATIONS.length)],
  });
  const submitEnabled = Object.values(selectedData).every(val => val.filter(Boolean).length === DESTINATIONS.length);

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

  // rendering logic
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '40px',
  }}>
    {submitEnabled && <Typography variant="h3" style={{fontSize: '30px'}}>Time taken: {selectedData["time_taken"].reduce((acc, val) => acc + val, 0)}</Typography>}

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
        onClick={() => { }}
      >
        Submit
      </Button>
    </div>
  </div>
}

export const GameArea = () => {
  // hooks
  const classes = useStyles();
  const { isLoading, isError, error, data } = useGetData();

  // rendering logic
  if (isLoading) return <div className={classes.circularProgress}>
    <CircularProgress size={25} color="inherit" />
  </div>

  if (isError) return <Alert severity="error">Error: {error.message}</Alert>

  return <AllDestinations planets={data.planets} vehicles={data.vehicles} />
}
