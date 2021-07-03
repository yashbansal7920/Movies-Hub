import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    background: theme.palette.grey[800],
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },

  image: {
    marginRight: theme.spacing(2),
  },

  typography: {
    color: theme.palette.grey[50],
  },
}));
