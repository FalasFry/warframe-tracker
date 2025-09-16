import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react"

function MarketPage() {

  const navigate = useNavigate();
  const [ modsData, setModsData ] = useState();

  return (
  <div>
    <nav className="stickyNavbar">
      <button onClick={() => navigate("/wishlist")}>Wishlist</button>
      <button onClick={() => navigate("/search")}>Items</button>
      <button onClick={() => navigate("/mods")}>Mods</button>
      <button onClick={() => navigate("/")}>Home</button>
    </nav>
    <h1>Market Page</h1>

    <form onSubmit={(e) => {
      e.preventDefault()
      alert('Search submitted')
      fetch(`http://localhost:3001/api/market/${e.target.query.value.toLowerCase().replace(/ /g, '_')}/orders`)
      .then(response => response.json())
      .then(data => setModsData(data.payload.orders))
      .catch(error => console.log(error));
    }}>
      <input type='text' name="query" />
      <div>
        {modsData && 
        modsData
        .filter(order => order.user.status === 'ingame' && order.order_type === 'sell' && order.region === 'en')
        .sort((a, b) => a.platinum - b.platinum)
        .map((order) => (
          <div key={order.id} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
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


    <p>This is the Market page.</p>
  </div>
  );
}
export default MarketPage;