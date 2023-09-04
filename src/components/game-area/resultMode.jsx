import { Button, Typography } from '@material-ui/core';
import React from 'react';

export const ResultMode = ({ resultData, setMode }) => {
  const wonGame = resultData?.status === "success";
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
  }}>
    <Typography variant="h3" style={{ fontSize: '30px' }}>{wonGame ? 'Success -- nice work Captain!' : "Failure -- but that's life"}</Typography>
    {wonGame && <Typography variant="h3" style={{ fontSize: '30px' }}>Planet found: {resultData.planet_name}</Typography>}
    <Button
      variant="outlined"
      size="small"
      onClick={() => setMode('game')}
    >
      Start again
    </Button>
  </div>
}