import React, { useState } from "react";
import { Grid, Typography,FormControl,FormHelperText,TextField,FormControlLabel,RadioGroup,Radio, Button } from "@mui/material";
import { Link } from "react-router-dom";
function CreateRoomPage(props) {
    const [state,setState]=useState({
        guestCanPause:true,
        votesToskip:2,
    })
    const guestCanPauseChange=(event)=>{
            setState(prevState=>({
                ...prevState,
                guestCanPause:event.target.value
            })
            )
    }

    const votesToskipChange=(event)=>{
        setState(prevState=>({
            ...prevState,
            votesToskip:event.target.value
        })
        )
    }

    const createButtonRender=()=>{
        return (
            <>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={createButtonPressed}>
                    Create Room
                </Button>
            </Grid><Grid item xs={12} align="center">
                    <Button color="secondary" to="/" component={Link} variant="contained">
                        Back
                    </Button>
                </Grid>
            </>
        )
    }

    const updateButtonRender=()=>
    {
        return (
            <>
                <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={updateButtonPressed}>
                    Update Room
                </Button>
            </Grid>
            </>
        )
    }
    const createButtonPressed=()=>{
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(
                {
                    guest_can_pause:state.guestCanPause,
                    votes_to_skip:state.votesToskip
                }
            )
        }
        fetch("/api/create",requestOptions)
        .then(response=>response.json())
        .then(data=>console.log(data))
        .catch(e=>console.log(e));
    }

    const updateButtonPressed=()=>{
        const requestOptions={
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                votes_to_skip:state.votesToskip,
                guest_can_pause:state.guestCanPause,
                code:props.roomCode
            })
        }
        fetch("/api/update-room",requestOptions)
        .then(response=>{
            if(response.ok)
            {
                console.log("Sucess")
                props.updateRoomCallBack()
            }
        })
        .catch(e=>console.log(e))
    }

    const title=props.update ? "Update A Room" :"Create A Room"
    return ( 
        <Grid container columns={4} spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h3">{title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormHelperText>
                        <Typography variant="span">Guest Control of Playback State</Typography>
                    </FormHelperText>
                <RadioGroup row defaultValue={true} onChange={guestCanPauseChange}>
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
            {props.update? updateButtonRender():createButtonRender()}
        </Grid>
     );
}

export default CreateRoomPage;