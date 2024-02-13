import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Room = () => {
  const [state, setState] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

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
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {state.votesToSkip}</p>
      <p>Guest Can Pause: {state.guestCanPause.toString()}</p>
      <p>Host: {state.isHost.toString()}</p>
    </div>
  );
}

export default Room;
