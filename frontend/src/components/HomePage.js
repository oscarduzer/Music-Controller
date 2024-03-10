import React, { useEffect, useState } from "react";
import {BrowserRouter as Router,Routes,Route, Link, Navigate} from "react-router-dom";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {Grid,Button, ButtonGroup, Typography} from "@mui/material";

function HomePage() {
    const [state,setState]=useState({
        roomCode:null
    });
    
    useEffect(() => {
        fetch("/api/user-in-room")
          .then((response) => response.json())
          .then((data) => {
            setState({
              roomCode: data.code,
            });
          })
      }, []);
const homeRender=()=>{
        return (
               <Grid container spacing={3}>
                    <Grid item xs={12} align="center">
                        <Typography variant="h2">House Party</Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <ButtonGroup disableElevation color="primary" variant="contained">
                        <Button color="primary" to="/create" component={Link}>
                            Create Room
                        </Button>
                        <Button  color="secondary" to="/join" component={Link}>
                            Join Room
                        </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
        )
    }

    const leaveRoomCallBack=()=>{
        setState({
            roomCode:null
        })
    }
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={state.roomCode ? <Navigate to={`/room/${state.roomCode}`} /> : homeRender()}/>
                <Route path="/create" element={<CreateRoomPage/>}/>
                <Route path="/join" element={<JoinRoomPage/>}/>
                <Route path="/room/:roomCode" element={<Room leaveRoom={leaveRoomCallBack}/>}/>
            </Routes>
        </Router>        
     );
}

export default HomePage;