const useGenre = (selectedGenres) => {
  if (selectedGenres.length === 0) return "";
  const genreIds = selectedGenres.map((genre) => genre.id);
  const genreurl = genreIds.reduce((acc, curr) => acc + "," + curr);
  return genreurl;
};

export default useGenre;
