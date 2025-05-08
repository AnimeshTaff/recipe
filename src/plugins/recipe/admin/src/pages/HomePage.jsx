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
import React, { useEffect, useState } from 'react';
import { Main } from '@strapi/design-system';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost:1337'; // adjust if different

  useEffect(() => {
    const fetchRecipes = async () => {
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

    fetchRecipes();
  }, []);

  if (loading) return <Main><p>Loading...</p></Main>;

  return (
    <Main>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>All Recipes</h1>
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
                  {recipe.ingredient}
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

