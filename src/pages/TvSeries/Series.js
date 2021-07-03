import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import Genres from "../../components/Genres/Genres";
import useGenre from "../../hooks/genreHook";
import Content from "../../components/CardContent/CardContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const Series = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const genreUrl = useGenre(selectedGenres);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${genreUrl}`
        );

        setIsLoading(false);
        setTotalPages(data.total_pages);
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [currentPage, genreUrl]);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h3"
            gutterBottom
            style={{ color: "#fafafa" }}
          >
            Discover Movies
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Genres
            type="tv"
            setCurrentPage={setCurrentPage}
            setSelectedGenres={setSelectedGenres}
            selectedGenres={selectedGenres}
          />
        </Grid>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid key={movie.id} item xs={12} sm={6} md={3}>
              <Content mediaType="tv" content={movie} />
            </Grid>
          ))
        ) : (
          <Typography style={{ color: "#fafafa" }} variant="h2" align="center">
            No Results Found
          </Typography>
        )}
        <Grid item xs={12}>
          <CustomPagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Series;
