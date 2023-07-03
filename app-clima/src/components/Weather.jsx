import {Container, Typography, Box, TextField} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import "../index.css"

const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`


const Weather = () => {
    const [ city, setCity ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState({
    error:false,
    message:""
  });
  const [ weather, setWeather ] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: "",
  });
  
  const onSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      error:false,
      message:""
    });
    try {
      if(!city.trim()) {
        throw{ message:"El campo Ciudad es obligatorio" };
      }
      const response = await fetch(`${API_WEATHER}${city}`);
      const data = await response.json();
      if(data.error) throw { message: data.error.message };
      console.log(data)
      setWeather({
        city: data.location.name,
        country:  data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      })
    } catch (error) {
      setError({
        error: true,
        message: error.message
      });
    } finally {
      setLoading(false);
    }

  }

  return(
    <>
    <Container
      maxWidth="xs"
      sx={{mt: 2}}
      className="container"
    >
      <Typography 
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
      >
        Weather App
      </Typography>
      <Box
        sx={{display:"grid", gap:2}}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField 
          id="city"
          label="Ciudad"
          variant="outlined"
          focused
          size="small"
          color="warning"
          required
          fullWidth
          value={city}
          inputProps={{ style: { color: "white" } }}
          onChange={(e) => setCity(e.target.value)}
          error={error.error}
          helperText={error.message}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          color="warning"
          loadingIndicator="Cargando..."
        >
          Buscar
        </LoadingButton>
      </Box>

      {weather?.city && (
        <Box
          sx={{
            mt: 2,
            display:"grid",
            gap: 2,
            textAlign:"center",
          }}
         className="container-card"
        >
          <Typography
            variant="h4"
            component="h2"
          >
            {weather?.city}, {weather?.country}
          </Typography>
          <Box
            component="img"
            alt={weather?.conditionText}
            src={weather?.icon}
            sx={{ margin: "0 auto" }}
          />
            <Typography
              variant="h5"
              component="h3"
            >
              { weather?.temp } °C
            </Typography>
            <Typography 
              variant="h6" 
              component="h4"
            >
              {weather?.conditionText}
            </Typography>
        </Box>
      )}

      <Typography
        textAlign="center"
        sx={{ mt:2, fontSize:"10px "}}
      >
        Powered by: {" "}
        <a  href="https://www.watherapi.com/"
            title="Weather API"
            style={{color:"#ed6c02"}}
        >
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  </>
  )
}

export default Weather;