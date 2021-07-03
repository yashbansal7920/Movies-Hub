import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#212121",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
    color: "#fafafa",
    overflowY: "scroll",
    scrollbarWidth: "none",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  img: {
    width: "358px",
    borderRadius: "10px",
    [theme.breakpoints.between(0, 960)]: {
      width: "100%",
      height: "auto",
    },
  },
}));
