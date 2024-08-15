import { Button, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const [topTracks, setTopTracks] = useState<any>(undefined);
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token")!;
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      fetchWebApi("v1/me", "GET")
        .then((data) => {
          if (data.error) {
            localStorage.removeItem("token");
            setToken("");
          } else setData(data);
        })
        .catch((error) => {
          localStorage.removeItem("token");
          setToken("");
        });
    }
  }, [token]);

  const fetchWebApi = async (
    endpoint: string,
    method?: string,
    body?: undefined
  ) => {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  };

  const handleLogin = () => {
    const REDIRECT_URI = "http://localhost:5173/authorize";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    window.location.href = `${AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  const getUserPlaylists = () => {
    if (token) {
      fetchWebApi("v1/me/playlists", "GET")
        .then((data) => {
          if(data.error) {
            console.error(data)
          } else {
            console.log(data);
            setUserPlaylists(data);
          }
        })
        .catch((error) => {
          console.error(error);
        })
      }
  }

  return (
    <MantineProvider defaultColorScheme='dark'>
      <div className="my-5">
        <span className="text-xl font-bold">Groove Hood</span>
      </div>
      <header className="App-header">
        {!token ? (
          <Button onClick={handleLogin}>Login to Spotify</Button>
        ) : (
          <div>
            {/* <h1>Logged in as {data?.display_name}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <button onClick={getUserPlaylists}>View Playlists</button>
            {<ul>
              {userPlaylists?.items?.map((playlistInfo, idx) => {
                return <li key={idx}>{playlistInfo.name}</li>
              })}
            </ul>}
          </div>
        )}
      </header>
    </MantineProvider>
  );
}

export default App;
