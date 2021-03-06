import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Backdrop,
  Fade,
  Grid,
  Button,
  Typography,
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core";
import { img, unavailable } from "../../config";
import YouTubeIcon from "@material-ui/icons/YouTube";
import useStyles from "./styles";
import Gallery from "../carousel/Gallery";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const ContentDetail = ({ type, id, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({});
  const [genres, setGenres] = useState([]);
  const [video, setVideo] = useState("");
  const [cast, setCast] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageUrl =
    windowWidth >= 960 ? detail.poster_path : detail.backdrop_path;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&append_to_response=videos,credits`
        );
        setDetail(data);
        setCast(data.credits.cast);
        setGenres(data.genres);
        setVideo(data.videos.results[0]?.key);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetail();
  }, []);

  console.log(detail);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const genresString = genres.map((g) => g.name).join(" | ");
  console.log(genresString);

  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={handleOpen}>
        {children}
      </div>
      <ThemeProvider theme={theme}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            {detail && (
              <Grid className={classes.paper} spacing={2} container>
                <Grid container justify="center" item xs={12} md={6}>
                  <img
                    className={classes.img}
                    src={
                      detail.poster_path ? `${img}/${imageUrl}` : unavailable
                    }
                    alt={detail.original_title || detail.original_name}
                  />
                </Grid>
                <Grid container spacing={2} item xs={12} md={6}>
                  <Grid item xs={12}>
                    <Typography gutterBottom align="center" variant="h4">
                      {`${detail.original_title || detail.original_name} (${(
                        detail.first_air_date ||
                        detail.release_date ||
                        "----"
                      ).substring(0, 4)})`}
                    </Typography>
                    <Typography gutterBottom align="center" variant="body1">
                      {`${genresString} ${
                        detail.runtime || detail.seasons?.length
                      } ${detail.runtime ? "min" : "Season"}`}
                    </Typography>
                    <br />
                    <Typography align="center" component="p" variant="body1">
                      {detail.overview}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Gallery cast={cast} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      component="a"
                      href={`https://www.youtube.com/watch?v=${video}`}
                      fullWidth
                      size="large"
                      startIcon={<YouTubeIcon />}
                      variant="contained"
                      color="secondary"
                    >
                      {video ? ` Watch the Trailer` : "No Trailer available"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Fade>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default ContentDetail;
