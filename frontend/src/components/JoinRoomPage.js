import React, { useState } from "react";
import { Grid,FormControl,TextField,Button,Alert } from "@mui/material";
import { Link } from "react-router-dom";


function JoinRoomPage() {
    const [error,Seterror]=useState("");
    const [roomCode,codeSet]=useState("");

    const roomCodeChange=(event)=>{
            codeSet(
                prevroomCode=> prevroomCode = event.target.value
            )
    }

    const enterRoomButtonCLick=()=>{
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                code:roomCode
            })
        }
        fetch("/api/join",requestOptions)
        .then(Response=>{
            Response.ok ? console.log("sucess") : Seterror( preverror=>preverror="Invalid Code" )
        })
        .catch(e=>console.log(e))
    }
    return ( 
        <Grid container columns={2} spacing={1} align="center">
            <Grid item xs={2} align="center">
                <FormControl>
                    <TextField type="text" label="Code" onChange={roomCodeChange} inputProps={{
                        style:{textAlign:"start"}
                    }} required={true} error={error.length>0}/>
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <Button color="primary" variant="contained" onClick={enterRoomButtonCLick}>Join Room</Button>
            </Grid>
            <Grid item xs={2}>
                <Button to="/" component={Link} color="secondary" variant="contained">Back</Button>
            </Grid>
        </Grid>
     );
}

export default JoinRoomPage;