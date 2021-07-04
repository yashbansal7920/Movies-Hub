import React, { useState } from "react";
import { Pagination } from "@material-ui/lab";
import useStyles from "./styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination = ({ totalPages, setCurrentPage }) => {
  const classes = useStyles();

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          className={classes.page}
          onChange={handlePageChange}
          count={totalPages}
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
