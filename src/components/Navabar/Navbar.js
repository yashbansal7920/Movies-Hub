import React from "react";
import { AppBar, Toolbar, Avatar, Typography } from "@material-ui/core";
import logo from "../../assets/logo.jpg";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Avatar className={classes.image} src={logo} />
        <Typography
          className={classes.typography}
          color="textPrimary"
          variant="h4"
        >
          Entertainment Hub
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
