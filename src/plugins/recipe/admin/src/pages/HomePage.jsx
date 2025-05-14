// import { Main } from '@strapi/design-system';
// import { useIntl } from 'react-intl';

// import { getTranslation } from '../utils/getTranslation';

// const HomePage = () => {
//   const { formatMessage } = useIntl();

//   return (
//     <Main>
//       <h1>Welcome to {formatMessage({ id: getTranslation('plugin.name') })}</h1>
//     </Main>
//   );
// };

// export { HomePage };

//test
// import React, { useEffect, useState } from 'react';
// import { Main } from '@strapi/design-system';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = 'http://localhost:1337'; // adjust if different

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const res = await fetch('/api/recipe/recipes');
//         const data = await res.json();
//         if (Array.isArray(data)) setRecipes(data);
//         else setRecipes([]);
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setRecipes([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   if (loading) return <Main><p>Loading...</p></Main>;

//   return (
//     <Main>
//       <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>All Recipes</h1>
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
//         {recipes.length > 0 ? (
//           recipes.map((recipe) => (
//             <div
//               key={recipe.id}
//               style={{
//                 width: '320px',
//                 padding: '16px',
//                 border: '1px solid #ccc',
//                 borderRadius: '12px',
//                 textAlign: 'center',
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                 backgroundColor: '#fff',
//               }}
//             >
//               <Link to={`recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                 {recipe.recipeimage?.url && (
//                   <img
//                     src={`${BASE_URL}${recipe.recipeimage.url}`}
//                     alt={recipe.name}
//                     style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
//                   />
//                 )}

//                 <div style={{ marginBottom: '8px', fontWeight: '700', fontSize: '18px', color: '#000' }}>
//                   {recipe.name}
//                 </div>

//                 <div style={{ marginBottom: '8px', fontWeight: '600', fontSize: '16px', color: '#000' }}>
//                   {recipe.description}
//                 </div>

//                 <div style={{ fontWeight: '500', fontSize: '14px', color: '#444' }}>
//                   {recipe.ingredient}
//                 </div>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No recipes found.</p>
//         )}
//       </div>
//     </Main>
//   );
// };

// export { HomePage };


//test 2 
import React, { useEffect, useState } from 'react';
import { Main, Button, TextInput, Textarea } from '@strapi/design-system';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '', ingredients: [''] });
  const [creating, setCreating] = useState(false);

  const BASE_URL = 'http://localhost:1337'; // adjust if needed

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/recipe/recipes');
      const data = await res.json();
      if (Array.isArray(data)) setRecipes(data);
      else setRecipes([]);
    } catch (err) {
      console.error('Fetch error:', err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleAddIngredient = () => {
    setForm(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ''],
    }));
  };

  const handleIngredientChange = (value, index) => {
    const updated = [...form.ingredients];
    updated[index] = value;
    setForm(prev => ({ ...prev, ingredients: updated }));
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        ingredients: form.ingredients.map(i => ({ details: i })),
      };

      const res = await fetch('/api/recipe/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setForm({ name: '', description: '', ingredients: [''] });
        fetchRecipes(); // refresh list
      } else {
        console.error('Failed to create recipe');
      }
    } catch (err) {
      console.error('Create error:', err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <Main><p>Loading...</p></Main>;

  return (
    <Main>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>All Recipes</h1>

      {/* CREATE FORM */}
      <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 12, marginBottom: 32 }}>
        <h2>Create New Recipe</h2>

        <TextInput
          label="Name"
          name="name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Enter recipe name"
          style={{ marginBottom: 16 }}
        />

        <Textarea
          label="Description"
          name="description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Enter description"
          style={{ marginBottom: 16 }}
        />

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 'bold' }}>Ingredients</label>
          {form.ingredients.map((ing, index) => (
            <TextInput
              key={index}
              value={ing}
              onChange={e => handleIngredientChange(e.target.value, index)}
              placeholder={`Ingredient ${index + 1}`}
              style={{ marginBottom: 8 }}
            />
          ))}
          <Button variant="secondary" onClick={handleAddIngredient} style={{ marginTop: 8 }}>
            + Add Ingredient
          </Button>
        </div>

        <Button loading={creating} onClick={handleCreate}>
          Create Recipe
        </Button>
      </div>

      {/* RECIPES LIST */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                width: '320px',
                padding: '16px',
                border: '1px solid #ccc',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
              }}
            >
              <Link to={`recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {recipe.recipeimage?.url && (
                  <img
                    src={`${BASE_URL}${recipe.recipeimage.url}`}
                    alt={recipe.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
                  />
                )}
                <div style={{ marginBottom: '8px', fontWeight: '700', fontSize: '18px', color: '#000' }}>
                  {recipe.name}
                </div>
                <div style={{ marginBottom: '8px', fontWeight: '600', fontSize: '16px', color: '#000' }}>
                  {recipe.description}
                </div>
                <div style={{ fontWeight: '500', fontSize: '14px', color: '#444' }}>
                  {recipe.ingredients?.map(i => i.details).join(', ')}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </Main>
  );
};

export { HomePage };

