import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chip } from "@material-ui/core";

const Genres = ({
  type,
  setSelectedGenres,
  selectedGenres,
  setCurrentPage,
}) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
        );
        setGenres(data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();

    return () => setGenres([]);
  }, [type]);

  const handleAdd = (genre) => {
    setSelectedGenres((prev) => [...prev, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setCurrentPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((s) => s.id !== genre.id));
    setGenres((prev) => [...prev, genre]);
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => {
        return (
          <Chip
            style={{ margin: "2px" }}
            label={genre.name}
            key={genre.name}
            clickable
            color="primary"
            size="small"
            onDelete={() => handleRemove(genre)}
          />
        );
      })}
      {genres.map((genre) => (
        <Chip
          style={{ margin: "2px" }}
          label={genre.name}
          key={genre.name}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
