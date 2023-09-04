import React, { useMemo, useState } from 'react';
import { CircularProgress } from "@material-ui/core";
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
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  }
}));

const AllDestinations = ({ planets, vehicles }) => {
  // hooks
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState({
    "planet_names": [],
    "vehicle_names": []
  });
  const planetData = useMemo(() => planets.map(obj => ({ ...obj, available: 1 })), [planets]);
  const vehicleData = useMemo(() => vehicles.map(obj => ({ ...obj, available: obj.total_no })), [vehicles]);

  // event handlers
  const handlePlanetSelection = (index, newValue) => {
    const prevValue = selectedData["planet_names"]?.[index];
    // change selectedData
    const newSelectedData = 
    // change planetData
  }
  const handleVehicleSelection = (index, prevValue, newValue) => {
    //
  }

  // rendering logic
  return <div className={classes.allDestinationsContainer}>
    {DESTINATIONS.map((val) => <Destination key={val} index={val} />)}
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

/**
 * selected planets and selected vehicles
 * available planets
 * available vehicles
 */