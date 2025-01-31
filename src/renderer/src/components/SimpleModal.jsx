import '../assets/modal.css';

function SimpleModal({ setClickedItem, isOpen, onClose, title, data, type }){
    if (!isOpen) return null;

    const handleCheckbox = (e, item) => {
      setClickedItem(c => ({
        ...c, 
        components: c.components
        .map(i => 
          i.name === item.name ? {...i, done: e.target.checked} : i
        )
      }));
    };
    return (
      <>
        <div className={`modal ${isOpen ? 'show' : ''}`} id="modal">
          <div className="modal-header">
            <div className="title">{title}</div>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            {data.map(item => {
              return(
                <>
                  {type === "item" && <div key={item.name+Math.random()} className="modal-content">
                    <h4>
                      {item.name + ' x' + item.itemCount}
                    </h4>
                    <div className="drop-container">
                      <div className="drop-locations">
                        {item.drops.filter(drop => !drop.location.includes('(Exceptional)') && !drop.location.includes('(Flawless)') && !drop.location.includes('(Radiant)')).map(drop => {
                          return(
                            <div key={item.name+drop.location+Math.random()} className="drop">
                              <div>
                                {' Drops at '+drop.location}
                              </div>
                            </div>
                          )},
                        )}
                      </div>
                      <div className="checkboxContainer">
                        <input 
                        type="checkbox" 
                        id={`doneCheckbox${item.name}`} 
                        checked={item.done || false}
                        onChange={(e) => handleCheckbox(e, item)}/>
                        <label htmlFor={`doneCheckbox${item.name}`}>Done</label>
                      </div>
                    </div>
                  </div>}

                  {type === "mod" && <div key={item.name+Math.random()} className="modal-content">
                    <div className="drop-locations">
                      <div>
                        <p>{'Drops at '+item.location + ' ' +(item.chance*100) +'%'}</p>
                      </div>
                    </div>
                  </div>}
                </>
              )
            })}
          </div>
        </div>
        <div className={`overlay ${isOpen ? 'show' : ''}`} id="overlay" onClick={onClose}></div>
      </>
    );
}
export default SimpleModal;