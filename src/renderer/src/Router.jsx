import { createHashRouter } from "react-router-dom";
import App from "./app";
import Wishlist from "./Wishlist";
import SearchPage from "./SearchPage";
import WorldState from "./WorldState";
import ModsPage from "./ModsPage";
import MarketPage from "./MarketPage";

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
    element: <WorldState />
  },
  {
    path: "search",
    element: <SearchPage />
  },
  {
    path: "wishlist",
    element: <Wishlist />
  },
  {
    path: "mods",
    element: <ModsPage />
  },
  {
    path: "market",
    element: <MarketPage />
  }


  ] 
},]);
export default router;