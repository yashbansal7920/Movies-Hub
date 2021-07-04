import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import { img, unavailable } from "../../config";

const Gallery = ({ cast }) => {
  const classes = useStyles();

  const newCast = cast.filter(
    (c, i) => c.known_for_department === "Acting" && i < 10
  );

  const items = newCast.map((c) => {
    return (
      <div className={classes.root} key={c.credit_id}>
        <img
          src={c.profile_path ? `${img}/${c.profile_path}` : unavailable}
          alt={c.name}
          className={classes.img}
        />
        <Typography variant="body2">{c.name}</Typography>
        <Typography variant="subtitle1">({c.character})</Typography>
      </div>
    );
  });

  const responsive = {
    0: { items: 3 },
    512: { items: 4 },
    1024: { items: 5 },
  };

  return (
    <AliceCarousel
      infinite
      disableDotsControls
      disableButtonsControls
      autoPlay
      mouseTracking
      items={items}
      responsive={responsive}
    />
  );
};

export default Gallery;
