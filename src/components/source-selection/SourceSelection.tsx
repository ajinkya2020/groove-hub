import { commonService } from "@/shared/common-service";
import { Button } from "@mantine/core";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const SourceSelection = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const [spotifyToken, setSpotifyToken] = useState("");
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("spotifyToken")!;
    setSpotifyToken(token);
  }, []);

  useEffect(() => {
    if (spotifyToken) {
      getSpotifyUser();
    }
  }, [spotifyToken]);

  const getSpotifyUser = () => {
    commonService
      .getSpotifyUser()
      .then((data) => {
        console.log(data);
        getUserPlaylists();
      })
      .catch((error: AxiosError) => {
        handleLogin();
        console.log(error.message);
        localStorage.removeItem("spotifyToken");
        setSpotifyToken("");
      });
  };

  const handleLogin = () => {
    const REDIRECT_URI = "http://localhost:5173/authorize";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    window.location.href = `${AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  const getUserPlaylists = () => {
    if (spotifyToken) {
      commonService
        .getSptifyAccessPlaylists()
        .then((data) => {
          console.log(data);
          setUserPlaylists(data.data);
        })
        .catch((error: AxiosError) => {
          console.log(error.message);
        });
    }
  };

  return (
    <header className="App-header">
      {!userPlaylists.length ? (
        <Button onClick={getSpotifyUser}>Login to Spotify</Button>
      ) : (
        <div>
          <button onClick={getUserPlaylists}>View Playlists</button>
          {
            <ul>
              {userPlaylists?.items?.map((playlistInfo, idx) => {
                return <li key={idx}>{playlistInfo.name}</li>;
              })}
            </ul>
          }
        </div>
      )}
    </header>
  );
}

export default SourceSelection