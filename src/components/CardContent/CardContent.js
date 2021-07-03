import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Badge,
} from "@material-ui/core";
import useStyles from "./styles";
import { img, unavailable } from "../../config";
import ContentDetail from "../ContentDetail/ContentDetail";

const Content = ({ content, mediaType }) => {
  const classes = useStyles();

  return (
    <ContentDetail type={mediaType} id={content.id}>
      <Card className={classes.root}>
        <Badge
          className={classes.badge}
          badgeContent={content.vote_average}
          color={content.vote_average > 6 ? "primary" : "secondary"}
        />
        <CardMedia
          className={classes.cardMedia}
          image={
            content.poster_path ? `${img}/${content.poster_path}` : unavailable
          }
        />
        <CardContent>
          <Typography align="center" variant="h6">
            {content.original_title || content.original_name}
          </Typography>
          <Typography
            className={classes.title}
            align="center"
            display="inline"
            variant="body1"
          >
            {content.media_type === "tv" ? "Tv Series" : "Movie"}
          </Typography>
          <Typography align="center" display="inline" variant="subtitle2">
            {content.release_date || content.first_air_date}
          </Typography>
        </CardContent>
      </Card>
    </ContentDetail>
  );
};

export default Content;
