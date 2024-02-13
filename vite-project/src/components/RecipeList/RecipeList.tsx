import React, { useState } from 'react';
import { Grid, Select, MenuItem, InputLabel, FormControl, TextField, Button } from '@mui/material';
import RecipeCard from "../../components/RecipeCard";
import useRecipesPaginated from "../../hooks/useRecipesPaginated";

const RecipeCardList = () => {
  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: recipes, isLoading, error } = useRecipesPaginated(searchTerm, currentPage, pageSize);

  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value);
    setCurrentPage(0);
  };

  const handleSearchChange = (event : any) => {
    setSearchTerm(event.target.value);
  };

  
  const handleSearchSubmit = () => {
    setCurrentPage(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="page-size-label">Page Size</InputLabel>
        <Select
          labelId="page-size-label"
          id="page-size-select"
          value={pageSize}
          label="Page Size"
          onChange={handlePageSizeChange}
        >
          {[3, 6, 9, 12].map(size => (
            <MenuItem key={size} value={size}>{size}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Search Recipes"
        value={searchTerm}
        onChange={handleSearchChange}
        margin="normal"
      />
      <Button onClick={handleSearchSubmit} variant="contained">Search</Button>
      <Grid container spacing={2}>
        {recipes && recipes.map((recipe, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RecipeCardList;

