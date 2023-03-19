import React, { useState } from "react";
import DateImageTable from "../elements/DateImageTable";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import {
  Grid,
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import MD5 from "crypto-js/md5";
import background from "../images/background.jpg";

export default function HomePage() {
  //Random year generator.
  // useEffect(() => {
  //   getRandomYear();
  // }, []);

  // const getRandomYear = () => {
  //   const currentYear = new Date().getFullYear();
  //   const min = Math.ceil(1961);
  //   const max = Math.floor(currentYear);
  //   setYear(Math.floor(Math.random() * (max - min) + min));
  // };

  // useEffect(() => {
  //   if (randomYear != 0) {
  //     getMarvelData();
  //   }
  // }, [randomYear]);

  //Loading tag.
  const [loading, setLoading] = useState(false);

  //Marvel API variables and handlers.
  const [year, setYear] = useState(1961);
  const [results, setResults] = useState([]);

  const getMarvelData = () => {
    setWelcome(false);
    setLoading(true);
    const timeStamp = Date.now().toString();
    const hash = MD5(
      timeStamp +
        process.env.REACT_APP_MARVEL_API_PRIVATE_KEY +
        process.env.REACT_APP_MARVEL_API_PUBLIC_KEY
    ).toString();
    const current_month = new Date().getMonth() + 1;
    const cm = current_month.toString();

    const url = `https://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${process.env.REACT_APP_MARVEL_API_PUBLIC_KEY}&hash=${hash}&dateRange=${year}-${cm}-01%2C%20${year}-${cm}-31&format=comic&limit=100&noVariants=true&orderBy=onsaleDate`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.data.results);
        setLoading(false);
      });

    console.log(results);
  };

  const randomButtonPressed = () => {
    setWelcome(false);
    setLoading(true);
    const currentYear = new Date().getFullYear();
    const min = Math.ceil(1961);
    const max = Math.floor(currentYear);
    const randomYear = Math.floor(Math.random() * (max - min) + min);
    setYear(randomYear);

    const timeStamp = Date.now().toString();
    const hash = MD5(
      timeStamp +
        process.env.REACT_APP_MARVEL_API_PRIVATE_KEY +
        process.env.REACT_APP_MARVEL_API_PUBLIC_KEY
    ).toString();
    const current_month = new Date().getMonth() + 1;
    const cm = current_month.toString();

    const url = `https://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${process.env.REACT_APP_MARVEL_API_PUBLIC_KEY}&hash=${hash}&dateRange=${randomYear}-${cm}-01%2C%20${randomYear}-${cm}-31&format=comic&limit=100&noVariants=true&orderBy=onsaleDate`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.data.results);
        setLoading(false);
      });

    console.log(results);
    window.scrollTo(0, 0);
  };

  //For month display.
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Rendering functions
  const [welcome, setWelcome] = useState(true);

  const renderWelcomeScreen = () => {
    return (
      <Grid
        container
        height={625}
        sx={{ backgroundImage: `url(${background})`, backgroundSize: "auto" }}
      >
        <Grid item xs={12} sx={{ p: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5" sx={{ color: "text.white" }}>
              This month in Marvel Comic History:
            </Typography>
            <Typography variant="h5" sx={{ color: "text.white" }}>
              {months[new Date().getMonth()]}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ pt: 45 }}
        >
          <Stack spacing={2}>
            <TextField
              size="small"
              variant="outlined"
              color="white"
              sx={{
                width: 225,
                input: { color: "text.white" },
              }}
              inputProps={{
                style: {
                  fontSize: 28,
                  textAlign: "center",
                  padding: 1,
                },
              }}
              value={year}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setYear(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") getMarvelData();
              }}
            />
            <Button
              variant="contained"
              color="white"
              onClick={getMarvelData}
              sx={{ fontWeight: "bold", color: "text.black" }}
            >
              Go
            </Button>
            <Button
              color="white"
              variant="text"
              onClick={randomButtonPressed}
              startIcon={<CasinoOutlinedIcon style={{ fontSize: 36 }} />}
              sx={{ fontSize: 24 }}
            >
              Random Year
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const renderMainContent = () => {
    return (
      <Grid container bgcolor="background.main">
        <Grid item xs={12} bgcolor="black.light" sx={{ p: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5" sx={{ color: "text.black" }}>
              This month in Marvel Comic History:
            </Typography>
            <Typography variant="h5" sx={{ color: "text.black" }}>
              {months[new Date().getMonth()]}
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              sx={{
                width: 125,
                input: { color: "text.black" },
              }}
              inputProps={{
                style: {
                  fontSize: 28,
                  textAlign: "center",
                  padding: 0,
                },
              }}
              value={year}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setYear(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") getMarvelData();
              }}
            />
            <Button
              variant="contained"
              color="white"
              onClick={getMarvelData}
              sx={{ fontWeight: "bold", color: "text.black" }}
            >
              Go
            </Button>
            <Button
              color="white"
              variant="text"
              onClick={randomButtonPressed}
              startIcon={<CasinoOutlinedIcon style={{ fontSize: 36 }} />}
              sx={{ fontSize: 24 }}
            >
              Random
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ minHeight: 550 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ px: 2, py: 1, height: "100%" }}
          >
            {loading ? (
              <CircularProgress color="black" />
            ) : (
              <DateImageTable results={results} />
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          sx={{ py: 1 }}
        >
          <Button
            variant="contained"
            color="black"
            onClick={randomButtonPressed}
            sx={{ fontWeight: "bold", color: "text.white" }}
          >
            Try Again
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box>
      {welcome === true ? (
        <Box>{renderWelcomeScreen()}</Box>
      ) : (
        <Box>{renderMainContent()}</Box>
      )}
    </Box>
  );
}
