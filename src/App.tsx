import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

function App() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const [topTracks, setTopTracks] = useState<any>(undefined);
  const [token, setToken] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem("token")!;
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      fetchWebApi("v1/me", "GET")
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>My Top Tracks</h1>
      <header className="App-header">
        {!token ? (
          <Button onClick={handleLogin}>Login to Spotify</Button>
        ) : (
          <div>
            <h1>Logged in as {data?.display_name}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </header>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </ThemeProvider>
  );
}

export default App;
