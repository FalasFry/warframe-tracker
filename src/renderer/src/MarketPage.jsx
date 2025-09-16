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
      .then(data => setModsData(data))
      .catch(error => console.log(error));
    }}>
      <input type='text' name="query" />
      <div>
        {modsData && modsData.payload && modsData.payload.orders && modsData.payload.orders.map((order) => (
          <div key={order.order_id} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
            <p>Order ID: {order.order_id}</p>
            <p>Item: {modsData.payload.item.item_name}</p>
            <p>Platform: {order.platform}</p>
            <p>Region: {order.region}</p>
            <p>Order Type: {order.order_type}</p>
            <p>Price: {order.platinum} Platinum</p>
            <p>Quantity: {order.quantity}</p>
            <p>Created: {new Date(order.creation_date).toLocaleString()}</p>
            <p>Last Updated: {new Date(order.last_update).toLocaleString()}</p>
            <p>Visible: {order.visible ? 'Yes' : 'No'}</p>
            <p>Mod Rank: {order.mod_rank}</p>
            <p>Seller: {order.user.ingame_name} (Reputation: {order.user.reputation})</p>
          </div>
        ))}
      </div>
    </form>


    <p>This is the Market page.</p>
  </div>
  );
}
export default MarketPage;