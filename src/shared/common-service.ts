import axios from "axios";

let spotifyToken = localStorage.getItem("spotifyToken");
const spotifyBaseUrl = "https://api.spotify.com/v1";
const spotifyHeader = {
  Authorization: `Bearer ${spotifyToken}`,
};

export const commonService = {
  setSpotifyAccessToken: (token: string) => {
    spotifyToken = token;
  },
  getSpotifyUser: () => {
    console.log(spotifyToken);
    return axios.get(`${spotifyBaseUrl}/me`, { headers: spotifyHeader });
  },
  getSptifyAccessPlaylists: () => {
    return axios.get(`${spotifyBaseUrl}/me/playlists`, {
      headers: spotifyHeader,
    });
  },
};
