import React, { useState, ChangeEvent } from 'react';
import { Box, Grid, InputAdornment, Pagination, Select, MenuItem, TextField, SelectChangeEvent } from '@mui/material';
import RecipeCard from "../../components/RecipeCard";
import useRecipesPaginated from "../../hooks/useRecipesPaginated";

const RecipeCardList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [selectedPage, setSelectedPage] = useState(1);
  const { data: recipes, isLoading, error } = useRecipesPaginated(searchQuery, currentPage, itemsPerPage);
  const pageCount = Math.ceil((recipes?.length ?? 0) / itemsPerPage);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setSelectedPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    setSelectedPage(value);
  };

  /*const handleDropdownChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedPage(event.target.value as number);
    setCurrentPage(event.target.value as number);
  };*/
  const handleDropdownChange = (event: SelectChangeEvent<number>) => {
    setSelectedPage(Number(event.target.value));
    setCurrentPage(Number(event.target.value));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid container spacing={2}>
      <TextField
        placeholder="Search recipes"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        size="small"
        sx={{ backgroundColor: 'white' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"></InputAdornment>
          ),
        }}
      />
      <Select
        value={selectedPage}
        onChange={handleDropdownChange}
        variant="outlined"
        size="small"
        sx={{ ml: 2 }}
      >
        {[...Array(pageCount)].map((_, index) => (
          <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
        ))}
      </Select>
      {recipes && recipes.map((recipe, i) => (
        <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
          <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} />
        </Box>
      )}
    </Grid>
  );
};

export default RecipeCardList;
