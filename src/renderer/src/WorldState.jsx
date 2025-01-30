import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react"
import Countdown from "./components/Countdown";

function WorldState(){

    const navigate = useNavigate();
    const [ worldState, setWorldState ] = useState();
    const [visibleTiers, setVisibleTiers] = useState({
        lith: false,
        meso: false,
        neo: false,
        axi: false
    });

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.warframestat.us/pc');
            const data = await response.json();
            setWorldState(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    setInterval(() => {
        fetchData();
    }, 60000);

    const refresh = useCallback(() => {
        //fetchData();
    }, []);


    useEffect(() => {
        fetchData();  
    }, []);

    const toggleVisibility = (tier) => {
        setVisibleTiers(prevState => ({
            ...prevState,
            [tier]: !prevState[tier]
        }));
    };

    return(
        <div>
            <nav className="stickyNavbar">
                <button onClick={() => navigate("/wishlist")}>Wishlist</button>
                <button onClick={() => navigate("/search")}>Items</button>
                <button onClick={() => navigate("/mods")}>Mods</button>
                <button>Fishing Help</button>
            </nav>

            <div className="state-container">
                <div key='worldState' className="world-state-container">
                    <h3>World State</h3>
                    {worldState && Object.entries(worldState)
                        .filter(entry => entry[0].includes('Cycle') && entry[0] !== 'earthCycle' && entry[0] !== 'zarimanCycle')
                        .map(state => {
                            return (
                                <div key={state[0] + Math.random()} className="world-state-item">
                                    <h3>{state[0].split('Cycle').join(' cycle')}</h3>
                                    <h5>
                                        {'Cycle: ' + state[1].state}
                                        <Countdown targetDate={state[1].expiry} onExpire={refresh}/>
                                    </h5>
                                </div>
                            );
                        })
                    }
                </div>

                <div key='fissures' className="fissures-container">
                    <h3>Fissures</h3>
                    {['lith', 'meso', 'neo', 'axi', 'requiem', 'omnia'].map(tier => (
                        <div key={tier} className="fissure-tier">
                            <div className="fissure-header" onClick={() => toggleVisibility(tier)}>
                                {tier.charAt(0).toUpperCase() + tier.slice(1)}
                                <span>{visibleTiers[tier] ? '-' : '+'}</span>
                            </div>
                            <div className={`fissure-content ${visibleTiers[tier] ? 'show' : ''}`}>
                                {worldState && <FissureDisplay worldState={worldState} tier={tier} refresh={refresh} />}
                            </div>
                        </div>
                    ))}
                </div>

                <div key='nightwave' className="nightwave-container">
                    <h3>Nightwave</h3>
                    <div key='nightwave-grid' className="nightwave-grid">
                        {worldState && worldState.nightwave.activeChallenges.map(challenge => {
                            return (
                                <div key={challenge.id} className="nightwave-griditem">
                                    <div>
                                        <div className="nightwave-desc">{challenge.desc}</div>
                                        <div className="nightwave-reputation">{challenge.reputation}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WorldState;

function FissureDisplay({worldState, tier, refresh}) {
    return worldState.fissures
    .sort((a, b) => a.tierNum - b.tierNum)
    .filter(fissure => fissure.tier.toLowerCase() === tier.toLowerCase())
    .filter(fissure => fissure.isStorm === false)
    .filter(fissure => fissure.expired === false)
    .map(fissure => {
        return (
            <div key={fissure.id} className="fissure-item">
                <div className="fissure-node">{fissure.node}</div>
                <div className="fissure-tier">{fissure.tier}</div>
                <div className="fissure-mission">{fissure.missionType}</div>
                <Countdown targetDate={fissure.expiry} onExpire={refresh} />
            </div>
        );
    });
}
