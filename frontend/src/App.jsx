import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomeScreen from "./pages/HomeScreen";
import MainLayout from "./layouts/MainLayout";
import ProductPage from "./pages/ProductPage";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;