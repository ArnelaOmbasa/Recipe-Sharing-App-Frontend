import { Box, Grid, InputAdornment, Pagination, TextField } from '@mui/material';
import RecipeCard from "../../components/RecipeCard";
import useGetAllRecipes from "../../hooks/useGetAllRecipes"; 
import { useState } from 'react';
//import useRecipesPaginated from '../../hooks/useRecipesPaginated';



const RecipeCardList = () => {

  const { data: recipes, isLoading, error } = useGetAllRecipes();
  //const { data: recipesPaginated, isLoadingPaginated, errorPaginated } = useRecipesPaginated('', 1, 3);


  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;


  //useGetRecipesByTitle(searchQuery);


  const filteredRecipes = recipes?.filter((recipe) => {
    return (
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())  
      );
    });


  const handleSearchChange = (event: any) => {

      setSearchQuery(event.target.value);
      setCurrentPage(1);



      };



    const pageCount = Math.ceil((filteredRecipes?.length ?? 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRecipes= filteredRecipes?.slice(startIndex, startIndex + itemsPerPage);
  

    const handlePageChange = (event: any, value: number) => {
      console.log(event);
      console.log(value);
      setCurrentPage(value);
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
                <InputAdornment position="start">
                </InputAdornment>
              ),
            }}
          />
       

        {recipes && paginatedRecipes?.map((recipe, i) => (
        <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))} 



{/*recipes && recipes.map((recipe, i) => (
         <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
         <RecipeCard recipe={recipe} />
       </Grid>
))*/}


        
        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
            <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} />
          </Box>
        )}


          


        
      

    </Grid>
  );
};

export default RecipeCardList;