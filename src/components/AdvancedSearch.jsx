//import { useState, useEffect, useReducer } from 'react';
import { useState } from 'react';
import './AdvancedSearch.css';
import TieredSelect from './TieredSelect';


//Helper Functions
function flattenItems(list, flattened = []) {
    
    for (const item of list) {
        if (item.children.length === 0) {     
            flattened.push({
                id: item.id,
                name: item.name,
                show: item.show,
                orbit: item.orbit
            });
        }

        if (item.children.length !== 0) {
            flattened = flattenItems(item.children, flattened);
        }
    }
    return flattened;
}


//Components
export default function AdvancedSearch ({ startDate, updateStartDate, endDate, updateEndDate, initialMinorBodies, intialMajorBodies, initialMissions, requestNewRender }) {
    const [majorBodies, setMajorBodies] = useState(intialMajorBodies);
    const [minorBodies, setMinorBodies] = useState(initialMinorBodies);
    const [missions, setMissions] = useState(initialMissions);
    

    function handleUpdateMajorBodies(list) {
        setMajorBodies(list);
    }

    function handleUpdateMinorBodies(list) {
        setMinorBodies(list);
    }

    function handleUpdateMissions(list) {
        setMissions(list);
    }

    function handleRenderRequest() {
        let flat = flattenItems(majorBodies);
        flat = flattenItems(minorBodies, flat);
        flat = flattenItems(missions, flat);

        requestNewRender(flat);
    }

    function handleExportRequest() {
        let flat = flattenItems(majorBodies);
        flat = flattenItems(minorBodies, flat);
        flat = flattenItems(missions, flat);

        requestNewRender(flat);
    }

    return (
        <form className='search-form'>
            <h2 style={{margin: 0, textAlign: 'center'}}>Advanced Selection</h2>
            <div className='search-grid'>
                <div className='search-grid-row'>
                    <label className='search-grid-cell'>
                        Start Date: <input name='startDate' value={startDate} onChange={updateStartDate} type='date'/>
                    </label>
                    <label className='search-grid-cell'>
                        End Date: <input name='endDate' value={endDate} onChange={updateEndDate} type='date'/>
                    </label>
                    <div className='search-grid-cell'>
                        <button className='search-button' type='button' onClick={handleRenderRequest} name='render'>Render</button>
                        <button className='search-button' type='button' onClick={handleExportRequest} name='export'>Export</button>
                    </div>
                </div>
                <div className="search-grid-row">
                    <div className="search-grid-column">
                        <h3 style={{marginTop: 0, marginBottom: '0.5em', textAlign: 'center'}}>Planets</h3>
                        <TieredSelect listObject={majorBodies} setlistObject={handleUpdateMajorBodies} />
                    </div>
                    <div className="search-grid-column">
                        <h3 style={{marginTop: 0, marginBottom: '0.5em', textAlign: 'center'}}>Minor Bodies</h3>
                        <TieredSelect listObject={minorBodies} setlistObject={handleUpdateMinorBodies}/>
                    </div>
                    <div className="search-grid-column">
                        <h3 style={{marginTop: 0, marginBottom: '0.5em', textAlign: 'center'}}>Missions</h3>
                        <TieredSelect listObject={missions} setlistObject={handleUpdateMissions} />
                    </div>
                </div>
            </div>
        </form>
    );
}