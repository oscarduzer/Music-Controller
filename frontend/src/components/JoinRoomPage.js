import React, { useState } from "react";
import { Grid,FormControl,TextField,Button,Alert } from "@mui/material";
import { Link } from "react-router-dom";


function JoinRoomPage() {
    const [error,Seterror]=useState("");
    const [code,codeSet]=useState("");

    const roomCodeChange=(event)=>{
        console.log(code)
            codeSet(
                prevcode=> prevcode = event.target.value
            )
    }
    return ( 
        <Grid container columns={2} spacing={1} align="center">
            <Grid item xs={2} align="center">
                <FormControl>
                    <TextField type="text" label="Code" inputProps={{
                        style:{textAlign:"center"}
                    }} required={true} error={error.length>0} onChange={roomCodeChange} />
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <Button color="primary" variant="contained">Join Room</Button>
            </Grid>
            <Grid item xs={2}>
                <Button to="/" component={Link} color="secondary" variant="contained">Back</Button>
            </Grid>
        </Grid>
     );
}

export default JoinRoomPage;