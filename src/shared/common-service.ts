import axios from "axios";

const spotifyToken = localStorage.getItem("spotifyToken");
const spotifyBaseUrl = "https://api.spotify.com/v1";
const spotifyHeader = {
  Authorization: `Bearer ${spotifyToken}`,
};

export const commonService = {
  getSpotifyUser: () => {
    return axios.get(`${spotifyBaseUrl}/me`, { headers: spotifyHeader });
  },
  getSptifyAccessPlaylists: () => {
    return axios.get(`${spotifyBaseUrl}/me/playlists`, {
      headers: spotifyHeader,
    });
  },
};
