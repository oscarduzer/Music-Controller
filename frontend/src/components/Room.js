import React, { useState, useEffect } from "react";
import { useParams, redirect } from 'react-router-dom';
import {Grid,Button,Typography} from "@mui/material";
const Room = () => {
  const [state, setState] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  const LeaveButtonPressed=()=>{
      let requestOptions={
        method:"POST",
        headers:{"Content-type":"application/json"},
      };
      fetch("/api/leave-room",requestOptions)
      .then((_response)=>{
          redirect("/");
      })
    };
  let { roomCode } = useParams();

  useEffect(() => {
    getRoomDetails();
  }, [roomCode]);

  const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setState({
          votesToSkip: data.vote_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography variant="h3">
            Code:{roomCode}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="p">
            Votes To Skip :{state.votesToSkip}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="p">
            Guest Can Pause: {state.guestCanPause.toString()}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Typography variant="p">
            Host:{state.isHost.toString()}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={LeaveButtonPressed}>
          Leave Room
        </Button>
        </Grid>
    </Grid>
  );
}

export default Room;
