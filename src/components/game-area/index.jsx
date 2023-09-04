import React, { useState } from 'react';
import { CircularProgress, Typography } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useGetData } from "../../hooks/useGetData";
import { useCheckResult } from "../../hooks/useCheckResult";
import { DESTINATIONS } from '../../constants';
import { GameMode } from './gameMode';
import { ResultMode } from './resultMode';

const useStyles = makeStyles(() => ({
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    margin: '32px 0px'
  },
}));

const DataWrapper = ({ planets, vehicles, resultData, mutate }) => {
  // hooks
  const [mode, setMode] = useState('game');
  const [selectedData, setSelectedData] = useState({
    "planet_names": [...Array(DESTINATIONS.length)],
    "vehicle_names": [...Array(DESTINATIONS.length)],
    "time_taken": [...Array(DESTINATIONS.length)],
  });
  const submitEnabled = Object.values(selectedData).every(val => val.filter(Boolean).length === DESTINATIONS.length);

  // render logic
  return <>
    {submitEnabled && <Typography variant="h3" align='center' style={{ fontSize: '30px', margin: '30px' }}>Time taken: {selectedData["time_taken"].reduce((acc, val) => acc + val, 0)}</Typography>}
    {mode === 'game' ? <GameMode
      mutate={mutate}
      setMode={setMode}
      planets={planets}
      vehicles={vehicles}
      selectedData={selectedData}
      setSelectedData={setSelectedData}
      submitEnabled={submitEnabled}
    /> : <ResultMode setMode={setMode} resultData={resultData} />}
  </>

}

export const GameArea = () => {
  // hooks
  const classes = useStyles();
  const { isLoading, isError, error, data } = useGetData();
  const mutation = useCheckResult();

  // rendering logic
  if (isLoading || mutation.isLoading) return <div className={classes.circularProgress}>
    <CircularProgress size={25} color="inherit" />
  </div>

  if (isError || mutation.isError) return <Alert severity="error">Error: {error?.message || mutation?.error?.message}</Alert>

  return <DataWrapper
    planets={data.planets}
    vehicles={data.vehicles}
    resultData={mutation.data}
    mutate={mutation.mutate}
  />
}
