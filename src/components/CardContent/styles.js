import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    // maxWidth: "350px",
    backgroundColor: "#484848",
    position: "relative",
    color: "#fafafa",
  },
  cardMedia: {
    height: 0,
    paddingTop: "120%",
    // backgroundSize: "contain",
  },
  cardContent: {
    paddingBottom: theme.spacing(1),
  },
  title: {
    marginRight: theme.spacing(3),
    marginInlineEnd: "50px",
  },
  badge: {
    position: "absolute",
    top: "10px",
    left: "95%",
  },
}));
