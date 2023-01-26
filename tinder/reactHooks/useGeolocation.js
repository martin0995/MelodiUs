import { useEffect, useState } from "react";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_GEOLOCATION);
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");

const useGeolocation = () => {
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation(() => ({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    }));
  };

  const onError = (error) => {
    setLocation(() => ({
      loaded: true,
      error,
    }));
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  Geocode.fromLatLng(location.coordinates.lat, location.coordinates.lng).then(
    (response) => {
      // const address = response.results[0].formatted_address;
      let city, state, country;
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case "locality":
              city = response.results[0].address_components[i].long_name;
              break;
            case "administrative_area_level_1":
              state = response.results[0].address_components[i].long_name;
              break;
            case "country":
              country = response.results[0].address_components[i].long_name;
              break;
          }
        }
      }

      const localPlace = city + ", " + state + ", " + country;
      setPlace(localPlace);
    },
    (error) => {
      console.error(error);
    }
  );

  return { location, place };
};

export default useGeolocation;
