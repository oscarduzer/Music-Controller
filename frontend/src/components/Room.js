import React,{useEffect, useState} from "react";
import { Link, useParams,useNavigate} from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";
function Room (props) {
    const [state,setState]=useState({
        votesToSkip:2,
        guestCanPause:true,
        isHost:false,
        setting:false
    });

    const navigate=useNavigate();
    let {roomCode}=useParams();
    useEffect(()=>{
        getRoomDetails()
    },[])
    const getRoomDetails=async ()=>{
       return await fetch("/api/room?code="+roomCode)
        .then(response=>response.json())
        .then(data=>{
            setState({
                votesToSkip:data.votes_to_skip,
                guestCanPause:data.guest_can_pause,
                isHost:data.host
            })
        })
        .catch(e=>console.log(e))
    }

    

    const settingRender=()=>{
        return (
            <Grid container columns={2} spacing={1} align="center">
                <Grid item xs={12} align="center">
                    <CreateRoomPage
                    roomCode={roomCode}
                    guestCanPause={state.guestCanPause}
                    votesToSkip={state.votesToSkip}
                    update={true}
                    updateRoomCallBack={getRoomDetails}
                    />
               </Grid>
               <Grid item xs={12} align="center">
                <Button color="secondary" onClick={()=> setState({setting:false})} variant="contained">
                    Close
                </Button>
            </Grid>
            </Grid>
        )
    }
    const leaveRoomCallBack=()=>{
        const requestOption={
            method:"POST",
            headers:{"Content-Type":"application/json"}
        }
        fetch("/api/leave-room",requestOption)
        .then(_response=>{
            props.leaveRoom();
            navigate("/");
        })
    }
        if(state.setting)
        {
            return (
                    settingRender()
            )
        }
        else
        {
            return ( 
                <>
                    <Grid container columns={3} spacing={3} align="center">
                        <Grid item xs={6} align="center">
                            <Typography variant="h4">
                                CODE : {roomCode}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="center">
                            <Typography variant="h5">
                                <em>Votes To Skip : </em>{state.votesToSkip}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="center">
                            <Typography variant="h5">
                               <em> Guest Can Pause :</em>{state.guestCanPause ? " Yes":" no"}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="center">
                            <Typography variant="h5">
                               <em>Host :</em>{state.isHost ? " Yes":" no"}
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={6} align="center">
                            <Button variant="contained" color="primary" onClick={()=>{
                                 setState({setting:true})
                            }}>
                              Setting
                            </Button>
                        </Grid>
                        <Grid item xs={6} align="center">
                            <Button variant="contained" color="secondary" to="/" component={Link} onClick={leaveRoomCallBack}>
                               Leave Room
                            </Button>
                        </Grid>
                    </Grid>
                </>
             );   
        }
   
}

export default Room;
