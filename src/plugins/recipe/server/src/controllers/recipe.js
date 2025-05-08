'use strict';

module.exports = {
  // CREATE
  async create(ctx) {
    try {
      const { name, description, ingredient, recipeimage } = ctx.request.body;

      const newIngredient = await strapi.entityService.create('api::ingredient.ingredient', {
        data: { ...ingredient },
      });

      const data = {
        name,
        description,
        ingredient: newIngredient.id,
      };

      if (recipeimage) data.recipeimage = recipeimage;

      const recipe = await strapi.entityService.create('api::recipe.recipe', {
        data,
        populate: {
          ingredient: { fields: ['details'] },
          recipeimage: true,
        },
      });

      ctx.body = {
        ...recipe,
        ingredient: recipe.ingredient?.details || null,
        recipeimage: recipe.recipeimage || null,
      };
    } catch (err) {
      console.error('Create error:', err);
      ctx.throw(500, 'Create failed');
    }
  },

  // READ all
  async findAll(ctx) {
    try {
      const recipes = await strapi.entityService.findMany('api::recipe.recipe', {
        fields: ['id', 'documentId', 'name', 'description'],
        populate: {
          ingredient: { fields: ['details'] },
          recipeimage: true,
        },
      });

      ctx.body = recipes.map(r => ({
        ...r,
        ingredient: r.ingredient?.details || null,
        recipeimage: r.recipeimage || null,
      }));
    } catch (err) {
      console.error('Find all error:', err);
      ctx.throw(500, 'Fetch failed');
    }
  },

  // READ one
  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      const recipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
        fields: ['id', 'documentId', 'name', 'description'],
        populate: {
          ingredient: { fields: ['details'] },
          recipeimage: true,
        },
      });

      if (!recipe) return ctx.throw(404, 'Not found');

      ctx.body = {
        ...recipe,
        ingredient: recipe.ingredient?.details || null,
        recipeimage: recipe.recipeimage || null,
      };
    } catch (err) {
      console.error('Find one error:', err);
      ctx.throw(500, 'Fetch failed');
    }
  },

  // UPDATE
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { name, description, recipeimage, ingredient } = ctx.request.body;

      const updated = await strapi.entityService.update('api::recipe.recipe', id, {
        data: { name, description, recipeimage },
        populate: {
          ingredient: { fields: ['details'] },
          recipeimage: true,
        },
      });

      if (updated.ingredient && ingredient) {
        await strapi.entityService.update('api::ingredient.ingredient', updated.ingredient.id, {
          data: { ...ingredient },
        });
      }

      const final = await strapi.entityService.findOne('api::recipe.recipe', id, {
        fields: ['id', 'documentId', 'name', 'description'],
        populate: {
          ingredient: { fields: ['details'] },
          recipeimage: true,
        },
      });

      ctx.body = {
        ...final,
        ingredient: final.ingredient?.details || null,
        recipeimage: final.recipeimage || null,
      };
    } catch (err) {
      console.error('Update error:', err);
      ctx.throw(500, 'Update failed');
    }
  },

  // DELETE
  async delete(ctx) {
    try {
      const { id } = ctx.params;

      const recipe = await strapi.entityService.findOne('api::recipe.recipe', id, {
        populate: ['ingredient'],
      });

      if (!recipe) return ctx.throw(404, 'Not found');

      const ingredientId = recipe.ingredient?.id;

      await strapi.entityService.delete('api::recipe.recipe', id);
      if (ingredientId) {
        await strapi.entityService.delete('api::ingredient.ingredient', ingredientId);
      }

      ctx.body = { message: 'Deleted successfully' };
    } catch (err) {
      console.error('Delete error:', err);
      ctx.throw(500, 'Delete failed');
    }
  },
};
