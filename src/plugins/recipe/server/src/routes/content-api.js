export default [
  // Default route example
  {
    method: 'GET',
    path: '/',
    handler: 'controller.index',
    config: {
      policies: [],
      auth: false,
    },
  },

  // Create a recipe with an ingredient
  {
    method: 'POST',
    path: '/recipes',
    handler: 'recipe.createRecipeWithIngredient',
    config: {
      policies: [],
      auth: false,
    },
  },

  // Get all recipes with ingredient.details only
  {
    method: 'GET',
    path: '/recipes',
    handler: 'recipe.findAllWithIngredient',
    config: {
      policies: [],
      auth: false,
    },
  },

  // Get one recipe by ID with ingredient.details only
  {
    method: 'GET',
    path: '/recipes/:id/details',
    handler: 'recipe.findOneWithIngredient',
    config: {
      policies: [],
      auth: false,
    },
  },

  // Update recipe and its ingredient
  {
    method: 'PUT',
    path: '/recipes/:id',
    handler: 'recipe.updateRecipeWithIngredient',
    config: {
      policies: [],
      auth: false,
    },
  },

  // Delete recipe and its ingredient
  {
    method: 'DELETE',
    path: '/recipes/:id',
    handler: 'recipe.deleteRecipeWithIngredient',
    config: {
      policies: [],
      auth: false,
    },
  },
];
