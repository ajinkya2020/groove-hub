import { useEffect, useState } from "react";
import { SUPPORTED_PLATFORMS } from "./App.constant";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <header className="App-header">
        {!token ? (
          <Button onClick={handleLogin}>Login to Spotify</Button>
        ) : (
          <div>
            <h1>Logged in as {data?.display_name}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </header> */}
      <div>
        <h1 className="flex justify-center font-bold">Groove Hood</h1>
        <h6 className="flex justify-center">Transfer Playlists between platforms seamlessly</h6>
      </div>
      <Card className="m-auto">
        <CardHeader>
          <CardTitle>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Source Platform" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_PLATFORMS.map((platform: string) => (
                  <SelectItem value={platform}>{platform}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </ThemeProvider>
  );
}

export default App;
