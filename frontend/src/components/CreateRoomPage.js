import React, { useState } from "react";
import { Grid, Typography,FormControl,FormHelperText,TextField,FormControlLabel,RadioGroup,Radio, Button } from "@mui/material";
import { Link } from "react-router-dom";
function CreateRoomPage() {
    const [guestCanPause,guestCanPauseSet]=useState(false);
    const [votesToskip,votesToskipSet]=useState(2);

    const guestCanPauseChange=(event)=>{
            guestCanPauseSet(
                prevguestCanpause=>prevguestCanpause=event.target.value
            )
    }

    const votesToskipChange=(event)=>{
        votesToskipSet(
            prevvotesToskip=>prevvotesToskip=event.target.value
        )
    }

    const createButtonPressed=()=>{
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(
                {
                    votes_to_skip:votesToskip,
                    guest_can_pause:guestCanPause
                }
            )
        }
        fetch("/api/create",requestOptions)
        .then(Response=>Response.json())
        .then(data=>console.log(data))
        .catch(e=>console.log(e));
    }
    return ( 
        <Grid container columns={4} spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h3">Create A Room</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormHelperText>
                        <Typography variant="span">Guest Control of Playback State</Typography>
                    </FormHelperText>
                <RadioGroup row defaultValue={false} onChange={guestCanPauseChange}>
                    <FormControlLabel
                        value={true}
                        control={<Radio color="primary"/>}
                        label="Play/Pause"
                        labelPlacement="bottom"
                    />
                    <FormControlLabel
                        value={false}
                        control={<Radio color="secondary"/>}
                        label="no control"
                        labelPlacement="bottom"
                    />
                </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                    required={true}
                    type="number"
                    defaultValue={2}
                    inputProps={{
                        min:1,
                        style:{textAlign:"center"}
                    }}
                    onChange={votesToskipChange}
                    />
                    <FormHelperText>
                        <span align="center">votes required To Skip</span>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={createButtonPressed}>
                    Create Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" to="/" component={Link} variant="contained">
                    Back
                </Button>
            </Grid>
        </Grid>
     );
}

export default CreateRoomPage;