import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate
} from "react-router-dom";

const HomePage = () => {
  const [state, setState] = useState({
    roomCode: null
  });

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setState({
          roomCode: data.code,
        });
      });
  }, []);

  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };
  const clearRoomCode=()=> {
    setState({
      roomCode: null,
    });
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={state.roomCode ? <Navigate to={`/room/${state.roomCode}`} /> : renderHomePage()} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode} />}/>
      </Routes>
    </Router>
  );
};

export default HomePage;
