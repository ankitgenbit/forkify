import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// if (module.hot) {
//   module.hot.accept();
// }
// console.log(icons);
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log('Building the forkify app..');

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; //guard clause
    recipeView.renderSpinner();

    //Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //Rendering Recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    // recipeView.renderError();
    // recipeView.rederMessage();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //Load search results
    await model.loadSearchResults(query);

    //Render results

    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultPage(3));

    //Render intial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //Render new results
  console.log(goToPage);
  resultsView.render(model.getSearchResultPage(goToPage));

  //Render new paginartion buttons
  paginationView.render(model.state.search);
};

const controlServings = function () {
  // update the recipe servings (in state)
  model.updateServings(8);

  // update the recipe view
  recipeView.render(model.state.recipe);
};

const newFeature = function () {
  console.log('New Feature Runs...');
};

const init = function () {
  console.log('Welcome');
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  newFeature();
};

init();

//
/*
why do we need software architechture
> software needs a structure, the way we organise our code
> maintenability: to change in future easily
> expandability: to add new features

> we can create our own architechture like we did in mapty project, we can use well-established patterns like
MVC, MVP, Flux, etx. or we can use framework like React, Angular, Vue etc.

Componenets of any architecture:
> Business logic: code that solves actual business problem, directly related to what business does and what it needs
> State: stores all the data about the application: single source of truth, ui should be kept in sync and state libraries exist
> HTTP Library: responsible for maing AJAX requests, optional but almost always neccessary in real world application
> Application Logic (aka Router): implementation of application itself, handles navigation and UI events
> Presentation Logic (aka UI Layer): all about visible part of the application html/css. it is to be kept in sync with  
*/

/*
MVC Architecture
<> Model (Business logic, state and HTTP) 
<> Controller(Application logic, bridge between model and views) dispatches tasks to model and view
<> View (Presentation logic)


Publisher-Subscriber design pattern
> Publisher which knows when to react
> Subscriber is the code that wants to react when event happens
> a function (in controller) subscribes to publisher by passing into a publisher function (in view)

*/
