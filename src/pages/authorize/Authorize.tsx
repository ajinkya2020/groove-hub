import { commonService } from "@/shared/common-service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Authorize = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem("spotifyToken");

    if (!token && hash) {
      console.log(hash);

      token =
        hash
          ?.substring(1)
          ?.split("&")
          ?.find((elem) => elem.startsWith("access_token"))
          ?.split("=")[1] || null;
      console.log(token);

      localStorage.setItem("spotifyToken", token!);
      commonService.setSpotifyAccessToken(token!);
      location.hash = "";
    }

    navigate("/");
  }, [location]);

  return null;
};
