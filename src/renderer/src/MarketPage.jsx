import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react"

function MarketPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const modName = location.state?.modName || '';
  const [modsData, setModsData] = useState();
  const [query, setQuery] = useState(modName);
  const [ searchedItem, setSearchedItem ] = useState();

  useEffect(() => {
    if (modName) {
      fetch(`http://localhost:3001/api/market/${modName.toLowerCase().replace(/ /g, '_')}/orders`)
        .then(response => response.json())
        .then(data => setModsData(data.payload.orders))
        .catch(error => console.log(error));
      setSearchedItem(modName);
    }
  }, [modName]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/market/${query.toLowerCase().replace(/ /g, '_')}/orders`)
      .then(response => response.json())
      .then(data => setModsData(data.payload.orders))
      .catch(error => console.log(error));
    setSearchedItem(query);
  };

  return (
    <div>
      <nav className="stickyNavbar">
        <button onClick={() => navigate("/wishlist")}>Wishlist</button>
        <button onClick={() => navigate("/search")}>Items</button>
        <button onClick={() => navigate("/mods")}>Mods</button>
        <button onClick={() => navigate("/")}>Home</button>
      </nav>
      <h1>Market Page</h1>
      <h2>{searchedItem}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name="query"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
        <div>
          {modsData &&
            modsData
              .filter(order => order.user.status === 'ingame' && order.order_type === 'sell' && order.region === 'en')
              .sort((a, b) => a.platinum - b.platinum)
              .slice(0, 5)
              .map((order) => (
                <div key={order.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                  <p>Name: {order.user.ingame_name}</p>
                  <p>Type: {order.order_type}</p>
                  <p>Price: {order.platinum} Platinum</p>
                  <button onClick={(e) => {
                    e.preventDefault()
                    navigator.clipboard.writeText(`/w ${order.user.ingame_name} Hi, I saw your ${order.item} listing on Warframe Tracker and I'm interested in buying it. Is it still available?`)
                  }}>Send Message</button>
                </div>
              ))}
        </div>
      </form>
    </div>
  );
}
export default MarketPage;