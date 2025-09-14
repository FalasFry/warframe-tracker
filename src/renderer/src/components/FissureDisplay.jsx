import Countdown from "./Countdown";

function FissureDisplay({worldState, tier, enableSP}) {
    return worldState.fissures
    .sort((a, b) => a.tierNum - b.tierNum)
    .sort((a,b) => a.isHard - b.isHard)
    .filter(fissure => fissure.tier.toLowerCase() === tier.toLowerCase())
    .filter(fissure => fissure.isStorm === false)
    .filter(fissure => fissure.isHard === enableSP || !fissure.isHard)
    .map(fissure => {
        return (
            <div key={fissure.id} className="fissure-item">
                <div className="fissure-node">{fissure.node}</div>
                <div className="fissure-mission">{fissure.missionType}</div>
                <div className="fissure-mode">{`Steel Path: ${fissure.isHard}`}</div>
                <Countdown targetDate={fissure.expiry} />
            </div>
        );
    });
}
export default FissureDisplay;