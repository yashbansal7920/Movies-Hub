import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Content from "../../components/CardContent/CardContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const Trendings = () => {
  const [trendings, setTrendings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`
         https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&page=${currentPage}`);

        setIsLoading(false);
        setTrendings(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrending();
  }, [currentPage]);

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
            Weekly Trendings
          </Typography>
        </Grid>
        {trendings.map((trending) => (
          <Grid key={trending.id} item xs={12} sm={6} md={3}>
            <Content content={trending} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <CustomPagination setCurrentPage={setCurrentPage} totalPages={10} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Trendings;
