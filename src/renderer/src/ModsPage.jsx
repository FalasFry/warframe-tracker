import { useNavigate } from "react-router-dom";
import './assets/modspage.css';

function ModsPage(){

    const navigate = useNavigate();

    return(
        <div>
            <nav className="stickyNavbar">
                <button onClick={() => navigate("/wishlist")}>Wishlist</button>
                <button onClick={() => navigate("/search")}>Items</button>
                <button onClick={() => navigate("/")}>Home</button>
            </nav>

            <h1>Mods Page</h1>
        </div>
    )
}
export default ModsPage;