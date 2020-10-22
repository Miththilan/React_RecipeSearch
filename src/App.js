import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = 'db205a33'
  const APP_KEY = '621a3aceda7e31206c4ea33bf7797e81'

  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState('chicken')

  useEffect(()=>{
    getRecipes();
  },[query]);


  //FETCH DATA
  const getRecipes=async ()=>{
    const response=await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    const data =await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  }


  const updateSearch= e =>{
    setSearch(e.target.value);
    console.log(search);
  }


  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');

  }


  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit ">
          Search
        </button> 
      </form>
<div className="recipe">
      {recipes.map(reci=>(
        <Recipe 
        title={reci.recipe.label} 
        calories={reci.recipe.calories}
        image={reci.recipe.image}
        ingredients={reci.recipe.ingredients}
        />
      ))};
      </div>

    </div>
  )
}

export default App;
