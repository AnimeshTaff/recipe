// 'use strict';

// module.exports = {
//   // CREATE
//   async create(ctx) {
//     try {
//       const { name, description, recipeimage, ingredients } = ctx.request.body;
  
//       const ingredientIds = [];
  
//       if (Array.isArray(ingredients)) {
//         for (const ing of ingredients) {
//           let existing = await strapi.entityService.findMany('api::ingredient.ingredient', {
//             filters: { details: ing.details },
//             limit: 1,
//           });
  
//           if (existing.length > 0) {
//             ingredientIds.push(existing[0].id);
//           } else {
//             const created = await strapi.entityService.create('api::ingredient.ingredient', {
//               data: { details: ing.details },
//             });
//             ingredientIds.push(created.id);
//           }
//         }
//       }
  
//       const data = {
//         name,
//         description,
//         recipeimage,
//         ingredients: ingredientIds,
//       };
  
//       const recipe = await strapi.entityService.create('api::recipe.recipe', {
//         data,
//         populate: {
//           ingredients: { fields: ['id', 'details'] },
//           recipeimage: true,
//         },
//       });
  
//       ctx.body = recipe;
//     } catch (err) {
//       console.error('Create error:', err);
//       ctx.status = 500;
//       ctx.body = {
//         error: 'Create failed',
//         details: err.message,
//       };
//     }
//   },
  
//   // READ ALL
//   async findAll(ctx) {
//     try {
//       const recipes = await strapi.entityService.findMany('api::recipe.recipe', {
//         fields: ['id', 'name', 'description'],
//         populate: {
//           ingredients: { fields: ['id', 'details'] },
//           recipeimage: true,
//         },
//       });

//       ctx.body = recipes;
//     } catch (err) {
//       console.error('Find all error:', err);
//       ctx.status = 500;
//       ctx.body = {
//         error: 'Fetch failed',
//         details: err.message,
//       };
//     }
//   },

//   // READ ONE
//   async findOne(ctx) {
//     try {
//       const { id } = ctx.params;

//       const recipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
//         fields: ['id', 'name', 'description'],
//         populate: {
//           ingredients: { fields: ['id', 'details'] },
//           recipeimage: true,
//         },
//       });

//       if (!recipe) return ctx.throw(404, 'Not found');

//       ctx.body = recipe;
//     } catch (err) {
//       console.error('Find one error:', err);
//       ctx.body = {
//         error: 'Fetch failed',
//         details: err.message,
//       };
//       ctx.status = 500;
//     }
//   },

//   // UPDATE
//   async update(ctx) {
//     try {
//       const { id } = ctx.params;
//       const { name, description, recipeimage, ingredients } = ctx.request.body;
  
//       const data = {
//         name,
//         description,
//         recipeimage,
//       };
  
//       if (Array.isArray(ingredients)) {
//         const ingredientIds = [];
  
//         for (const ing of ingredients) {
//           const existing = await strapi.entityService.findMany('api::ingredient.ingredient', {
//             filters: { details: ing.details },
//             limit: 1,
//           });
  
//           if (existing.length > 0) {
//             ingredientIds.push(existing[0].id);
//           } else {
//             const created = await strapi.entityService.create('api::ingredient.ingredient', {
//               data: { details: ing.details },
//             });
//             ingredientIds.push(created.id);
//           }
//         }
  
//         // Set the new ingredients
//         data.ingredients = ingredientIds;
//       }
  
//       const updated = await strapi.entityService.update('api::recipe.recipe', id, {
//         data,
//         populate: {
//           ingredients: { fields: ['id', 'details'] },
//           recipeimage: true,
//         },
//       });
  
//       ctx.body = updated;
//     } catch (err) {
//       console.error('Update error:', err);
//       ctx.status = 500;
//       ctx.body = {
//         error: 'Update failed',
//         details: err.message,
//       };
//     }
//   },
  

//   // DELETE
//   async delete(ctx) {
//     try {
//       const { id } = ctx.params;

//       const recipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
//         populate: ['ingredients'],
//       });

//       if (!recipe) return ctx.throw(404, 'Not found');

//       await strapi.entityService.delete('api::recipe.recipe', id);

//       ctx.body = { message: 'Deleted successfully' };
//     } catch (err) {
//       console.error('Delete error:', err);
//       ctx.body = {
//         error: 'Delete failed',
//         details: err.message,
//       };
//       ctx.status = 500;
//     }
//   },
// };

//test
'use strict';

const { parseMultipartData } = require('@strapi/utils');

module.exports = {
  // CREATE
  async create(ctx) {
    try {
      let data, files;
  
      if (ctx.is('multipart')) {
        data = ctx.request.body;
        files = ctx.request.files;
      } else {
        data = ctx.request.body;
      }
  
      const { name, description, ingredients } = data;
      const ingredientIds = [];
  
      if (ingredients) {
        const parsedIngredients = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;
  
        for (const ing of parsedIngredients) {
          const existing = await strapi.entityService.findMany('api::ingredient.ingredient', {
            filters: { details: ing.details },
            limit: 1,
          });
  
          if (existing.length > 0) {
            ingredientIds.push(existing[0].id);
          } else {
            const created = await strapi.entityService.create('api::ingredient.ingredient', {
              data: { details: ing.details },
            });
            ingredientIds.push(created.id);
          }
        }
      }
  
      let uploadedImage = null;
  
      if (files && files.recipeimage) {
        const uploadResult = await strapi.plugins.upload.services.upload.upload({
          data: {
            fileInfo: {
              name: files.recipeimage.name || "Recipe Image",
              caption: "Uploaded via API",
              alternativeText: "Recipe image",
            },
          },
          files: files.recipeimage,
        });
  
        if (uploadResult && uploadResult.length > 0) {
          uploadedImage = uploadResult[0].id;
        }
      }
  
      const entry = await strapi.entityService.create('api::recipe.recipe', {
        data: {
          name,
          description,
          ingredients: ingredientIds,
          recipeimage: uploadedImage,
        },
        populate: {
          ingredients: { fields: ['id', 'details'] },
          recipeimage: true,
        },
      });
  
      ctx.body = entry;
    } catch (err) {
      console.error('Create Recipe Error:', err);
      ctx.status = 500;
      ctx.body = { error: 'Failed to create recipe', details: err.message };
    }
  },
  

  // READ ALL
  async findAll(ctx) {
    try {
      const recipes = await strapi.entityService.findMany('api::recipe.recipe', {
        fields: ['id', 'name', 'description'],
        populate: {
          ingredients: { fields: ['id', 'details'] },
          recipeimage: true,
        },
      });

      ctx.body = recipes;
    } catch (err) {
      console.error('Find all error:', err);
      ctx.status = 500;
      ctx.body = { error: 'Fetch failed', details: err.message };
    }
  },

  // READ ONE
  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      const recipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
        fields: ['id', 'name', 'description'],
        populate: {
          ingredients: { fields: ['id', 'details'] },
          recipeimage: true,
        },
      });

      if (!recipe) return ctx.throw(404, 'Not found');

      ctx.body = recipe;
    } catch (err) {
      console.error('Find one error:', err);
      ctx.status = 500;
      ctx.body = { error: 'Fetch failed', details: err.message };
    }
  },

  // UPDATE
  async update(ctx) {
    try {
      const { id } = ctx.params;
      let data, files;
  
      if (ctx.is('multipart')) {
        data = ctx.request.body;
        files = ctx.request.files;
      } else {
        data = ctx.request.body;
      }
  
      const { name, description, ingredients } = data;
      const ingredientIds = [];
  
      if (ingredients) {
        const parsedIngredients = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;
  
        for (const ing of parsedIngredients) {
          const existing = await strapi.entityService.findMany('api::ingredient.ingredient', {
            filters: { details: ing.details },
            limit: 1,
          });
  
          if (existing.length > 0) {
            ingredientIds.push(existing[0].id);
          } else {
            const created = await strapi.entityService.create('api::ingredient.ingredient', {
              data: { details: ing.details },
            });
            ingredientIds.push(created.id);
          }
        }
      }
  
      let uploadedImage = null;
  
      if (files && files.recipeimage) {
        const uploadResult = await strapi.plugins.upload.services.upload.upload({
          data: {
            fileInfo: {
              name: files.recipeimage.name || "Updated Recipe Image",
              caption: "Updated via API",
              alternativeText: "Updated recipe image",
            },
          },
          files: files.recipeimage,
        });
  
        if (uploadResult && uploadResult.length > 0) {
          uploadedImage = uploadResult[0].id;
        }
      }
  
      const updated = await strapi.entityService.update('api::recipe.recipe', id, {
        data: {
          name,
          description,
          ingredients: ingredientIds,
          ...(uploadedImage && { recipeimage: uploadedImage }),
        },
        populate: {
          ingredients: { fields: ['id', 'details'] },
          recipeimage: true,
        },
      });
  
      ctx.body = updated;
    } catch (err) {
      console.error('Update Recipe Error:', err);
      ctx.status = 500;
      ctx.body = { error: 'Failed to update recipe', details: err.message };
    }
  },
  

  // DELETE
  async delete(ctx) {
    try {
      const { id } = ctx.params;

      const recipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
        populate: ['ingredients'],
      });

      if (!recipe) return ctx.throw(404, 'Not found');

      await strapi.entityService.delete('api::recipe.recipe', id);

      ctx.body = { message: 'Deleted successfully' };
    } catch (err) {
      console.error('Delete error:', err);
      ctx.status = 500;
      ctx.body = { error: 'Delete failed', details: err.message };
    }
  },
};

