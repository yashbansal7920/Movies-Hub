import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MovieIcon from "@material-ui/icons/Movie";
import TvIcon from "@material-ui/icons/Tv";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const BottomNav = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  return (
    <BottomNavigation
      className={classes.root}
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      showLabels
    >
      <BottomNavigationAction
        className={classes.icon}
        icon={<WhatshotIcon />}
        label="Trending"
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        component={Link}
        to="/movies"
        className={classes.icon}
        icon={<MovieIcon />}
        label="Movies"
      />
      <BottomNavigationAction
        className={classes.icon}
        icon={<TvIcon />}
        label="Tv Series"
        component={Link}
        to="/series"
      />
      <BottomNavigationAction
        className={classes.icon}
        icon={<SearchIcon />}
        label="Search"
        component={Link}
        to="/search"
      />
    </BottomNavigation>
  );
};

export default BottomNav;
