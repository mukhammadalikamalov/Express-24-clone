import React, { useEffect, useState } from "react";
import { Box, Grid, Button, CircularProgress } from "@mui/material";
import RecipeCard from "./components/Cards/RecipeCard";
import SearchBar from "./components/Form/SearchBar";
import Layout from "./components/layout/layout";

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const itemsPerPage = 6;

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hideCards, setHideCards] = useState(false);

  useEffect(() => {
    searchRecipes();
  }, []);

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = searchApi + query;
    const res = await fetch(url);
    const data = await res.json();
    setRecipe(data.meals);
    setIsLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClick = () => {
    setIsLoading(true);

    // Simulate a long-running process
    setTimeout(() => {
      setIsLoading(false);
      loadMore(); // Call loadMore function after loading to show additional cards
    }, 2000);
  };

  const handleHide = () => {
    setHideCards(true);
  };

  const handleShow = () => {
    setHideCards(false);
  };

  return (
    <Layout>
      <SearchBar isLoading={isLoading} query={query} setQuery={setQuery} handleSubmit={handleSubmit} />

      <Box sx={{ flexGrow: 1, maxWidth: "md", margin: "auto" }}>
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 12 }}>
          {!hideCards &&
            recipe &&
            recipe.slice(0, currentPage * itemsPerPage).map((r, idx) => (
              <Grid item xs={4} sm={4} md={4} key={idx}>
                <RecipeCard key={r.idMeal} recipe={r} />
              </Grid>
            ))}
        </Grid>
      </Box>

      {!hideCards && recipe.length > currentPage * itemsPerPage && (
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Button
            style={{
              width: "66%",
              height: "6vh",
              backgroundColor: "#E0E0E4",
              color: "black",
              borderRadius: "10px",
              marginLeft: "87px",
            }}
            onClick={handleClick}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : <>Show more</>}
          </Button>
        </Grid>
      )}

      {!hideCards && recipe.length > itemsPerPage && recipe.length <= (currentPage + 1) * itemsPerPage && (
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Button
            style={{
              width: "66%",
              height: "6vh",
              backgroundColor: "#E0E0E4",
              color: "black",
              borderRadius: "10px",
              marginLeft: "87px",
            }}
            onClick={handleHide}
          >
            Hide
          </Button>
        </Grid>
      )}

      {hideCards && recipe.length > itemsPerPage && (
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Button
            style={{
              width: "66%",
              height: "6vh",
              backgroundColor: "#E0E0E4",
              color: "black",
              borderRadius: "10px",
              marginLeft: "87px",
            }}
            onClick={handleShow}
          >
            Show more
          </Button>
        </Grid>
      )}
    </Layout>
  );
};

export default HomePage;
