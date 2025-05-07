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
    handler: 'recipe.create',
    config: {
      policies: [],
      auth: false,
    },
  },

  // Get all recipes with ingredient.details only
  {
    method: 'GET',
    path: '/recipes',
    handler: 'recipe.findAll',
    config: {
      policies: [],
      auth: false,
    },
  },

  // Get one recipe by ID with ingredient.details only
  {
    method: 'GET',
    path: '/recipes/:id/details',
    handler: 'recipe.findOne',
    config: {
      policies: [],
      auth: false,
    },
  },

  // Update recipe and its ingredient
  {
    method: 'PUT',
    path: '/recipes/:id',
    handler: 'recipe.update',
    config: {
      policies: [],
      auth: false,
    },
  },

  // Delete recipe and its ingredient
  {
    method: 'DELETE',
    path: '/recipes/:id',
    handler: 'recipe.delete',
    config: {
      policies: [],
      auth: false,
    },
  },
];
