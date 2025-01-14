import React from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Banner from './Components/Banner/Banner';
import RecipeCategory from './Pages/RecipeCategory';
import RecipeDetails from './Pages/RecipeDetails';
import SearchResults from "./Pages/SearchResults";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path= '/' element={<Banner/>}/>
        <Route path= '/BreakFast' element={<RecipeCategory category="BreakFast"/>}/>
        <Route path= '/Lunch' element={<RecipeCategory category="Lunch"/>}/>
        <Route path= '/Dinner' element={<RecipeCategory category="Dinner"/>}/>
        <Route path= '/Dessert' element={<RecipeCategory category="Dessert"/>}/>
        <Route path= '/Snacks' element={<RecipeCategory category="Snacks"/>}/>
        <Route path= '/Beverages' element={<RecipeCategory category="Beverages"/>}/>
        <Route path= '/category/:category' element={<RecipeCategory/>}/>
        <Route path= '/recipe/:id' element={<RecipeDetails/>}/>
        <Route path= '/search' element={<SearchResults />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
