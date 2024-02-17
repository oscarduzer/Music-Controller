import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormControlLabel,RadioGroup,Radio,FormControl,FormHelperText,TextField,Typography,Grid,Button
} from "@mui/material";
const CreateRoomPage =() => {
  let { defaultVotes } = 2;

  const [state,setState]=useState({
    guestCanPause: true,
    votesToSkip: defaultVotes,
  });

  const handleVotesChange=(e)=> {
    setState(prevState => ({
      ...prevState,
      votesToSkip: e.target.value,
    }));
  }

  const handleGuestCanPauseChange=(e)=> {
    setState(prevState => ({
      ...prevState,
      guestCanPause: e.target.value === "true" ? true : false,
    }));
  }

  const handleRoomButtonPressed=()=> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vote_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h3">
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <span align="center">Guest Control of Playback State</span>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
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
              onChange={handleVotesChange}
              defaultValue={defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <span align="center">Votes Required To Skip Song</span>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

export default CreateRoomPage;
