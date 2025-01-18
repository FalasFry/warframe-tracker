import { createHashRouter } from "react-router-dom";
import App from "./app";
import Wishlist from "./Wishlist";
import SearchPage from "./SearchPage";

const router = createHashRouter([
{
  path: "/",
  element: <App />,
  children: [
  {
      path: "*",
      element: <p>Page Not Found</p>
  },
  {
    index: true,
    element: <SearchPage />
  },
  {
    path: "wishlist",
    element: <Wishlist />
  },

  ] 
},]);
export default router;