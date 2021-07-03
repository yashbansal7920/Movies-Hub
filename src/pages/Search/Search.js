import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Grid,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Content from "../../components/CardContent/CardContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fafafa",
    },
  },
});

const Search = () => {
  const [inputTerm, setInputTerm] = useState("");
  const [type, setType] = useState(0);
  const [collection, setCollection] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSearch = async () => {
    try {
      if (!inputTerm) return;
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type === 0 ? "movie" : "tv"
        }?api_key=${
          process.env.REACT_APP_MOVIE_DB_API_KEY
        }&language=en-US&page=${currentPage}&query=${inputTerm}&include_adult=false`
      );
      setCollection(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSearch();
  }, [type, currentPage]);

  const onTabChange = (e, value) => {
    setType(value);
    setCurrentPage(1);
  };

  return (
    <Container>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ display: "flex" }}>
          <TextField
            defaultValue={inputTerm}
            onChange={(e) => setInputTerm(e.target.value)}
            fullWidth
            label="Search"
            variant="filled"
            style={{ flex: 1 }}
          />
          <Button
            style={{ marginLeft: "10px" }}
            onClick={fetchSearch}
            variant="contained"
          >
            <SearchIcon />
          </Button>
        </Container>
        <Tabs
          style={{ marginBottom: "20px" }}
          value={type}
          onChange={onTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Search Movies" style={{ width: "50%" }} />
          <Tab label="Search Tv series" style={{ width: "50%" }} />
        </Tabs>
      </ThemeProvider>
      <Grid spacing={2} container>
        {collection.length > 0 || inputTerm ? (
          collection.map((c) => (
            <Grid key={c.id} item xs={12} sm={6} md={3}>
              <Content mediaType={type === 0 ? "movie" : "tv"} content={c} />
            </Grid>
          ))
        ) : (
          <Typography style={{ color: "#fafafa" }} variant="h2" align="center">
            No Results Found
          </Typography>
        )}

        <Grid item xs={12}>
          {totalPages > 0 && (
            <CustomPagination
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
