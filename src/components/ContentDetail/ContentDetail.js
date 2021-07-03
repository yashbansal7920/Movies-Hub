import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Backdrop, Fade, Grid, Typography } from "@material-ui/core";
import { img, unavailable } from "../../config";
import useStyles from "./styles";

const ContentDetail = ({ type, id, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState([]);

  // useEffect(() => {
  //   const fetchDetail = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&append_to_response=videos,credits`
  //       );
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchDetail();
  // }, [id, type]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={handleOpen}>
        {children}
      </div>
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
          <Grid spacing={3} container>
            <Grid item xs={12} md={6}>
              Poster
            </Grid>
            <Grid container direction="column" item xs={12} md={6}>
              <Grid item xs={12}>
                Description
              </Grid>
              <Grid item xs={12}>
                Casourel
              </Grid>
              <Grid item xs={12}>
                Link
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </>
  );
};

export default ContentDetail;
