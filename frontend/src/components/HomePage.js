import React from "react";
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {Grid,Button, ButtonGroup, Typography} from "@mui/material";

function HomePage() {

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
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={homeRender()}/>
                <Route path="/create" element={<CreateRoomPage/>}/>
                <Route path="/join" element={<JoinRoomPage/>}/>
                <Route path="/room" element={<Room/>}/>
            </Routes>
        </Router>        
     );
}

export default HomePage;