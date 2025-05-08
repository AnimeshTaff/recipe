// import { Page } from '@strapi/strapi/admin';
// import { Routes, Route } from 'react-router-dom';

// import { HomePage } from './HomePage';

// const App = () => {
//   return (
//     <Routes>
//       <Route index element={<HomePage />} />
//       <Route path="*" element={<Page.Error />} />
//     </Routes>
//   );
// };

// export { App };

//test
import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import RecipeDetail from './RecipeDetail';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="recipes/:id" element={<RecipeDetail />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };



