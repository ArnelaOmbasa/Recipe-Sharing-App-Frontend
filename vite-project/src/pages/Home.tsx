import RecipeCardList from '../components/RecipeList';

const Home = () => {
  return (
    <div>
      
      <div className="root-content">
        <h1 style={{ paddingBottom: '50px' }} >Welcome to the Recipe Sharing Platform</h1>
        <RecipeCardList />
      </div>
    </div>
  );
};

export default Home;
