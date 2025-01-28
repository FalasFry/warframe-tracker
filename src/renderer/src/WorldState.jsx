import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import Countdown from "./components/Countdown";

function WorldState(){

    const navigate = useNavigate();
    const [ worldState, setWorldState ] = useState();


    useEffect(() => {
        fetch('https://api.warframestat.us/pc')
        .then(response => response.json())
        .then(data => setWorldState(data))
        .catch(error => console.log(error))
    },[])

    return(
        <div className="state-container">
            <button onClick={() => navigate("/wishlist")}>Wishlist</button>
            <button onClick={() => navigate("/search")}>Items</button>
            <div key='worldState' className="world-state-container">
                <h3>World State</h3>
                {worldState && Object.entries(worldState)
                    .filter(entry => entry[0].includes('Cycle') && entry[0] !== 'earthCycle' && entry[0] !== 'zarimanCycle')
                    .map(state => {
                        return (
                            <div key={state[0] + Math.random()} className="world-state-item">
                                <h4>{state[0].toLowerCase()}</h4>
                                <h5>
                                    {'Cycle: ' + state[1].state}
                                    <Countdown targetDate={state[1].expiry}/>
                                </h5>
                            </div>
                        );
                    })
                }
            </div>

            <div key='fissures' className="fissures-container">
                <h3>Fissures</h3>
                <div className="fissure-tier">
                    Lith
                    {worldState && 
                    <FissureDisplay worldState={worldState} tier='lith' />}
                </div>
                <div className="fissure-tier">
                    Meso
                    {worldState && 
                    <FissureDisplay worldState={worldState} tier='meso' />}
                </div>
                <div className="fissure-tier">
                    Neo
                </div>
                <div className="fissure-tier">
                    Axi
                </div>
                <div className="fissure-tier">
                    Requiem
                </div>
                <div className="fissure-tier">
                    Omnia
                </div>

            </div>
        </div>
    )
}
export default WorldState;

function FissureDisplay(worldState){
    worldState.worldState.fissures
    .sort((a,b) => a.tierNum - b.tierNum)
    .filter(fissure => fissure.tier === worldState.tier)
    .map(fissure => {
        return(
            <div key={fissure.id} className="fissure-item">
                <div className="fissure-node">{fissure.node}</div>
                <div className="fissure-tier">{fissure.tier}</div>
                <div className="fissure-mission">{fissure.missionType}</div>
                <div className="fissure-storm">{fissure.isStorm ? 'Railjack' : ''}</div>
                <Countdown targetDate={fissure.expiry}/>
            </div>
        )
    })
}
