// 'use strict';

// module.exports = {
//   // CREATE recipe and ingredient
//   async createRecipeWithIngredient(ctx) {
//     try {
//       const { name, description, ingredient, recipeimage } = ctx.request.body;

//       // Create the ingredient
//       const newIngredient = await strapi.entityService.create('api::ingredient.ingredient', {
//         data: {
//           ...ingredient,
//         },
//       });

//       // Create the recipe with the related ingredient
//       const newRecipe = await strapi.entityService.create('api::recipe.recipe', {
//         data: {
//           name,
//           description,
//           recipeimage,
//           ingredient: newIngredient.id,
//         },
//         populate: ['ingredient'],
//       });

//       ctx.body = newRecipe;
//     } catch (error) {
//       console.error('Create error:', error);
//       ctx.throw(500, 'Failed to create recipe with ingredient');
//     }
//   },

//   // READ all recipes with ingredients
//   async findAllWithIngredient(ctx) {
//     try {
//       const recipes = await strapi.entityService.findMany('api::recipe.recipe', {
//         populate: ['ingredient'],
//       });
//       ctx.body = recipes;
//     } catch (error) {
//       console.error('Find error:', error);
//       ctx.throw(500, 'Failed to fetch recipes');
//     }
//   },

//   // UPDATE recipe and its ingredient
//   async updateRecipeWithIngredient(ctx) {
//     try {
//       const { id } = ctx.params;
//       const { name, description, recipeimage, ingredient } = ctx.request.body;

//       // Update the recipe
//       const updatedRecipe = await strapi.entityService.update('api::recipe.recipe', id, {
//         data: {
//           name,
//           description,
//           recipeimage,
//         },
//         populate: ['ingredient'],
//       });

//       // Update related ingredient if it exists
//       if (updatedRecipe.ingredient && ingredient) {
//         await strapi.entityService.update('api::ingredient.ingredient', updatedRecipe.ingredient.id, {
//           data: {
//             ...ingredient,
//           },
//         });
//       }

//       // Get full updated recipe
//       const finalRecipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
//         populate: ['ingredient'],
//       });

//       ctx.body = finalRecipe;
//     } catch (error) {
//       console.error('Update error:', error);
//       ctx.throw(500, 'Failed to update recipe with ingredient');
//     }
//   },

//   // DELETE recipe and its ingredient
//   async deleteRecipeWithIngredient(ctx) {
//     try {
//       const { id } = ctx.params;

//       const recipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
//         populate: ['ingredient'],
//       });

//       if (!recipe) return ctx.throw(404, 'Recipe not found');

//       const ingredientId = recipe.ingredient?.id;

//       await strapi.entityService.delete('api::recipe.recipe', id);

//       if (ingredientId) {
//         await strapi.entityService.delete('api::ingredient.ingredient', ingredientId);
//       }

//       ctx.body = { message: 'Deleted recipe and ingredient successfully' };
//     } catch (error) {
//       console.error('Delete error:', error);
//       ctx.throw(500, 'Failed to delete recipe and ingredient');
//     }
//   },
// };

'use strict';

module.exports = {
  // CREATE recipe and ingredient
  async createRecipeWithIngredient(ctx) {
    try {
      const { name, description, ingredient, recipeimage } = ctx.request.body;

      // Create the ingredient
      const newIngredient = await strapi.entityService.create('api::ingredient.ingredient', {
        data: {
          ...ingredient,
        },
      });

      // Create the recipe with the related ingredient
      const newRecipe = await strapi.entityService.create('api::recipe.recipe', {
        data: {
          name,
          description,
          recipeimage,
          ingredient: newIngredient.id,
        },
        populate: {
          ingredient: {
            fields: ['details'],
          },
        },
      });

      // Format response
      ctx.body = {
        ...newRecipe,
        ingredient: newRecipe.ingredient?.details || null,
      };
    } catch (error) {
      console.error('Create error:', error);
      ctx.throw(500, 'Failed to create recipe with ingredient');
    }
  },

  // READ all recipes with only ingredient.details
  async findAllWithIngredient(ctx) {
    try {
      const recipes = await strapi.entityService.findMany('api::recipe.recipe', {
        fields: ['id', 'documentId', 'name', 'description'],
        populate: {
          ingredient: {
            fields: ['details'],
          },
        },
      });

      // Format response
      const formatted = recipes.map(recipe => ({
        ...recipe,
        ingredient: recipe.ingredient?.details || null,
      }));

      ctx.body = formatted;
    } catch (error) {
      console.error('Find error:', error);
      ctx.throw(500, 'Failed to fetch recipes');
    }
  },

  // READ one recipe by ID with only ingredient.details
  async findOneWithIngredient(ctx) {
    try {
      const { id } = ctx.params;

      const recipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
        fields: ['id', 'documentId', 'name', 'description'],
        populate: {
          ingredient: {
            fields: ['details'],
          },
        },
      });

      if (!recipe) return ctx.throw(404, 'Recipe not found');

      // Format response
      ctx.body = {
        ...recipe,
        ingredient: recipe.ingredient?.details || null,
      };
    } catch (error) {
      console.error('Find one error:', error);
      ctx.throw(500, 'Failed to fetch recipe');
    }
  },

  // UPDATE recipe and its ingredient
  async updateRecipeWithIngredient(ctx) {
    try {
      const { id } = ctx.params;
      const { name, description, recipeimage, ingredient } = ctx.request.body;

      // Update the recipe
      const updatedRecipe = await strapi.entityService.update('api::recipe.recipe', id, {
        data: {
          name,
          description,
          recipeimage,
        },
        populate: {
          ingredient: {
            fields: ['details'],
          },
        },
      });

      // Update related ingredient if it exists
      if (updatedRecipe.ingredient && ingredient) {
        await strapi.entityService.update('api::ingredient.ingredient', updatedRecipe.ingredient.id, {
          data: {
            ...ingredient,
          },
        });
      }

      // Final fetch for fresh data
      const finalRecipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
        fields: ['id', 'documentId', 'name', 'description'],
        populate: {
          ingredient: {
            fields: ['details'],
          },
        },
      });

      ctx.body = {
        ...finalRecipe,
        ingredient: finalRecipe.ingredient?.details || null,
      };
    } catch (error) {
      console.error('Update error:', error);
      ctx.throw(500, 'Failed to update recipe with ingredient');
    }
  },

  // DELETE recipe and its ingredient
  async deleteRecipeWithIngredient(ctx) {
    try {
      const { id } = ctx.params;

      const recipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
        populate: ['ingredient'],
      });

      if (!recipe) return ctx.throw(404, 'Recipe not found');

      const ingredientId = recipe.ingredient?.id;

      await strapi.entityService.delete('api::recipe.recipe', id);

      if (ingredientId) {
        await strapi.entityService.delete('api::ingredient.ingredient', ingredientId);
      }

      ctx.body = { message: 'Deleted recipe and ingredient successfully' };
    } catch (error) {
      console.error('Delete error:', error);
      ctx.throw(500, 'Failed to delete recipe and ingredient');
    }
  },
};
