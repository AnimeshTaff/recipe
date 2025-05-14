// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const RecipeDetail = () => {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = 'http://localhost:1337';

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         console.log('Fetching recipe with id:', id);
//         const response = await fetch(`${BASE_URL}/api/recipe/recipes/${id}/details`);
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log('Raw API Response:', data);
        
//         // Ensure we have the required fields
//         if (!data.name || !data.description) {
//           console.warn('Missing required fields in recipe data:', data);
//         }
        
//         setRecipe(data);
//       } catch (err) {
//         console.error('Error fetching recipe:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   if (loading) return <div style={{ padding: '30px' }}>Loading...</div>;

//   if (error) return (
//     <div style={{ padding: '30px', color: 'red' }}>
//       Error loading recipe: {error}
//     </div>
//   );

//   if (!recipe) return <div style={{ padding: '30px' }}>Recipe not found.</div>;

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
//       <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
//         {recipe.name || 'No Name'}
//       </h2>

//       {recipe.recipeimage?.url && (
//         <img
//           src={`${BASE_URL}${recipe.recipeimage.url}`}
//           alt={recipe.name || 'Recipe Image'}
//           style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '20px', borderRadius: '8px' }}
//         />
//       )}

//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>Description</h3>
//         <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
//           {recipe.description || 'No description available'}
//         </p>
//       </div>

//       <div>
//         <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>Ingredients</h3>
//         <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
//           {recipe.ingredient || 'No ingredients available'}
//         </p>
//       </div>

//       {/* Debug information */}
//       <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
//         <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>Debug Information:</h4>
//         <pre style={{ fontSize: '14px', whiteSpace: 'pre-wrap' }}>
//           {JSON.stringify(recipe, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetail;


//test
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const RecipeDetail = () => {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = 'http://localhost:1337';

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/recipe/recipes/${id}/details`);
//         if (!response.ok) throw new Error(`Error: ${response.status}`);

//         const data = await response.json();
//         setRecipe(data);
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   if (loading) return <div style={{ padding: '30px', color: 'black' }}>Loading...</div>;
//   if (error) return <div style={{ padding: '30px', color: 'red' }}>Error: {error}</div>;
//   if (!recipe) return <div style={{ padding: '30px', color: 'black' }}>Recipe not found.</div>;

//   return (
//     <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', color: 'black' }}>
//       <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: 'black' }}>
//         {recipe.name || 'No Name'}
//       </h2>

//       {recipe.recipeimage?.url && (
//         <img
//           src={`${BASE_URL}${recipe.recipeimage.url}`}
//           alt={recipe.name}
//           style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '20px', borderRadius: '8px' }}
//         />
//       )}

//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px', color: 'black' }}>Description</h3>
//         <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'black' }}>
//           {recipe.description || 'No description available'}
//         </p>
//       </div>

//       <div>
//         <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px', color: 'black' }}>Ingredients</h3>
//         <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'black' }}>
//           {recipe.ingredient || 'No ingredients available'}
//         </p>
//       </div>

//       {/* <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
//         <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: 'black' }}>Debug Info:</h4>
//         <pre style={{ fontSize: '14px', whiteSpace: 'pre-wrap', color: 'black' }}>
//           {JSON.stringify(recipe, null, 2)}
//         </pre>
//       </div> */}
//     </div>
//   );
// };

// export default RecipeDetail;

//test2 
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const RecipeDetail = () => {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = 'http://localhost:1337';

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/recipe/recipes/${id}/details`);
//         if (!response.ok) throw new Error(`Error: ${response.status}`);

//         const data = await response.json();
//         setRecipe(data);
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   if (loading) return <div style={{ padding: '30px', color: 'black' }}>Loading...</div>;
//   if (error) return <div style={{ padding: '30px', color: 'red' }}>Error: {error}</div>;
//   if (!recipe) return <div style={{ padding: '30px', color: 'black' }}>Recipe not found.</div>;

//   return (
//     <div
//       style={{
//         maxWidth: '800px',
//         margin: '0 auto',
//         padding: '30px',
//         backgroundColor: '#fff',
//         borderRadius: '12px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         color: 'black',
//       }}
//     >
//       <h2
//         style={{
//           fontSize: '32px',
//           fontWeight: 'bold',
//           marginBottom: '20px',
//           textAlign: 'center',
//           color: 'black',
//         }}
//       >
//         {recipe.name || 'No Name'}
//       </h2>

//       {recipe.recipeimage?.url && (
//         <img
//           src={`${BASE_URL}${recipe.recipeimage.url}`}
//           alt={recipe.name}
//           style={{
//             width: '100%',
//             height: 'auto',
//             objectFit: 'cover',
//             marginBottom: '20px',
//             borderRadius: '8px',
//           }}
//         />
//       )}

//       <div style={{ marginBottom: '20px' }}>
//         <h3
//           style={{
//             fontSize: '24px',
//             fontWeight: '600',
//             marginBottom: '10px',
//             color: 'black',
//           }}
//         >
//           Description
//         </h3>
//         <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'black' }}>
//           {recipe.description || 'No description available'}
//         </p>
//       </div>

//       <div>
//         <h3
//           style={{
//             fontSize: '24px',
//             fontWeight: '600',
//             marginBottom: '10px',
//             color: 'black',
//           }}
//         >
//           Ingredients
//         </h3>
//         {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
//           <ul style={{ fontSize: '18px', lineHeight: '1.6', color: 'black', paddingLeft: '20px' }}>
//             {recipe.ingredients.map((ing) => (
//               <li key={ing.id}>{ing.details}</li>
//             ))}
//           </ul>
//         ) : (
//           <p style={{ fontSize: '18px', color: 'black' }}>No ingredients available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecipeDetail;

//test3
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const RecipeDetail = () => {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({ name: '', description: '', ingredients: [] });

//   const BASE_URL = 'http://localhost:1337';

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/recipe/recipes/${id}/details`);
//         if (!response.ok) throw new Error(`Error: ${response.status}`);
//         const data = await response.json();
//         setRecipe(data);
//         setForm({
//           name: data.name || '',
//           description: data.description || '',
//           ingredients: data.ingredients?.map(i => i.details) || [],
//         });
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRecipe();
//   }, [id]);

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleIngredientChange = (index, value) => {
//     const updated = [...form.ingredients];
//     updated[index] = value;
//     setForm(prev => ({ ...prev, ingredients: updated }));
//   };

//   const addIngredient = () => {
//     setForm(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const payload = {
//         name: form.name,
//         description: form.description,
//         ingredients: form.ingredients.map(details => ({ details })),
//       };

//       const res = await fetch(`${BASE_URL}/api/recipe/recipes/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error('Failed to update');

//       const updatedData = await res.json();
//       setRecipe(updatedData);
//       setEditMode(false);
//     } catch (err) {
//       console.error('Update failed:', err);
//       alert('Update failed!');
//     }
//   };

//   if (loading) return <div style={{ padding: '30px', color: 'black' }}>Loading...</div>;
//   if (error) return <div style={{ padding: '30px', color: 'red' }}>Error: {error}</div>;
//   if (!recipe) return <div style={{ padding: '30px', color: 'black' }}>Recipe not found.</div>;

//   return (
//     <div
//       style={{
//         maxWidth: '800px',
//         margin: '0 auto',
//         padding: '30px',
//         backgroundColor: '#fff',
//         borderRadius: '12px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         color: 'black',
//         position: 'relative',
//       }}
//     >
//       {/* Edit Icon */}
//       <button
//         onClick={() => setEditMode(!editMode)}
//         style={{
//           position: 'absolute',
//           top: '16px',
//           right: '16px',
//           fontSize: '20px',
//           cursor: 'pointer',
//           border: 'none',
//           background: 'transparent',
//         }}
//         title="Edit"
//       >
//         ✏️
//       </button>

//       {/* Name */}
//       <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
//         {editMode ? (
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             style={{ fontSize: '24px', padding: '4px', width: '100%' }}
//           />
//         ) : (
//           recipe.name || 'No Name'
//         )}
//       </h2>

//       {/* Image */}
//       {recipe.recipeimage?.url && (
//         <img
//           src={`${BASE_URL}${recipe.recipeimage.url}`}
//           alt={recipe.name}
//           style={{
//             width: '100%',
//             height: 'auto',
//             objectFit: 'cover',
//             marginBottom: '20px',
//             borderRadius: '8px',
//           }}
//         />
//       )}

//       {/* Description */}
//       <div style={{ marginBottom: '20px' }}>
//         <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>Description</h3>
//         {editMode ? (
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             rows={4}
//             style={{ width: '100%', padding: '8px' }}
//           />
//         ) : (
//           <p style={{ fontSize: '18px' }}>{recipe.description || 'No description available'}</p>
//         )}
//       </div>

//       {/* Ingredients */}
//       <div>
//         <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>Ingredients</h3>
//         {editMode ? (
//           <div>
//             {form.ingredients.map((val, idx) => (
//               <input
//                 key={idx}
//                 value={val}
//                 onChange={(e) => handleIngredientChange(idx, e.target.value)}
//                 style={{ display: 'block', marginBottom: '8px', width: '100%', padding: '6px' }}
//               />
//             ))}
//             <button onClick={addIngredient} style={{ marginTop: '10px' }}>+ Add Ingredient</button>
//           </div>
//         ) : Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
//           <ul style={{ fontSize: '18px', paddingLeft: '20px' }}>
//             {recipe.ingredients.map((ing) => (
//               <li key={ing.id}>{ing.details}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No ingredients available</p>
//         )}
//       </div>

//       {/* Save Button */}
//       {editMode && (
//         <button
//           onClick={handleUpdate}
//           style={{
//             marginTop: '24px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             backgroundColor: '#007bff',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: 'pointer',
//           }}
//         >
//           Save Changes
//         </button>
//       )}
//     </div>
//   );
// };

// export default RecipeDetail;


//test4
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    ingredients: [],
    imageFile: null,
  });

  const BASE_URL = 'http://localhost:1337';

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/recipe/recipes/${id}/details`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setRecipe(data);
        setForm({
          name: data.name || '',
          description: data.description || '',
          ingredients: data.ingredients?.map(i => i.details) || [],
          imageFile: null,
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...form.ingredients];
    updated[index] = value;
    setForm(prev => ({ ...prev, ingredients: updated }));
  };

  const addIngredient = () => {
    setForm(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const handleImageChange = (e) => {
    setForm(prev => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);

      form.ingredients.forEach((ing, index) => {
        formData.append(`ingredients[${index}][details]`, ing);
      });

      if (form.imageFile) {
        formData.append('files.recipeimage', form.imageFile);
      }

      const res = await fetch(`${BASE_URL}/api/recipe/recipes/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update');

      const updatedData = await res.json();
      setRecipe(updatedData);
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed!');
    }
  };

  if (loading) return <div style={{ padding: '30px', color: 'black' }}>Loading...</div>;
  if (error) return <div style={{ padding: '30px', color: 'red' }}>Error: {error}</div>;
  if (!recipe) return <div style={{ padding: '30px', color: 'black' }}>Recipe not found.</div>;

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        color: 'black',
        position: 'relative',
      }}
    >
      {/* Edit Icon */}
      <button
        onClick={() => setEditMode(!editMode)}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontSize: '20px',
          cursor: 'pointer',
          border: 'none',
          background: 'transparent',
        }}
        title="Edit"
      >
        ✏️
      </button>

      {/* Name */}
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        {editMode ? (
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ fontSize: '24px', padding: '4px', width: '100%' }}
          />
        ) : (
          recipe.name || 'No Name'
        )}
      </h2>

      {/* Image */}
      {recipe.recipeimage?.url && (
        <img
          src={`${BASE_URL}${recipe.recipeimage.url}`}
          alt={recipe.name}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            marginBottom: '20px',
            borderRadius: '8px',
          }}
        />
      )}
      {editMode && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Update Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
      )}

      {/* Description */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>Description</h3>
        {editMode ? (
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            style={{ width: '100%', padding: '8px' }}
          />
        ) : (
          <p style={{ fontSize: '18px' }}>{recipe.description || 'No description available'}</p>
        )}
      </div>

      {/* Ingredients */}
      <div>
        <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>Ingredients</h3>
        {editMode ? (
          <div>
            {form.ingredients.map((val, idx) => (
              <input
                key={idx}
                value={val}
                onChange={(e) => handleIngredientChange(idx, e.target.value)}
                style={{ display: 'block', marginBottom: '8px', width: '100%', padding: '6px' }}
              />
            ))}
            <button onClick={addIngredient} style={{ marginTop: '10px' }}>+ Add Ingredient</button>
          </div>
        ) : Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
          <ul style={{ fontSize: '18px', paddingLeft: '20px' }}>
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>{ing.details}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients available</p>
        )}
      </div>

      {/* Save Button */}
      {editMode && (
        <button
          onClick={handleUpdate}
          style={{
            marginTop: '24px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default RecipeDetail;
