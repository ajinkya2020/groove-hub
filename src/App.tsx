import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const [topTracks, setTopTracks] = useState<any>(undefined);
  const [token, setToken] = useState('');
  const [data, setData] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem('token')!;
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      fetchWebApi("v1/me", "GET")
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
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
    const REDIRECT_URI = 'http://localhost:5173/authorize';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    window.location.href = `${AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  return (
    <>
      <h1>My Top Tracks</h1>
      <header className="App-header">
        {!token ? (
          <button onClick={handleLogin}>Login to Spotify</button>
        ) : (
          <div>
            <h1>Logged in as {data?.display_name}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </header>
    </>
  );
}

export default App;
