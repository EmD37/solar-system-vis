import './TieredSelect.css';
import { useState } from "react";
import * as treeUtils from '../scripts/treeUtils.js'

//Components
function Tier ({ items, onClick }) {
    
    return (
        <ul className="tiered-select-list">
            {items.map(item => {
                if (item.children.length === 0) {
                    return <li key={item.id}><span tabIndex={-1} className='tiered-select-item' id={item.id} onClick={onClick}>{item.name}</span></li>
                } else {
                    return (
                        <li key={item.id} >
                            <span tabIndex={-1} className='tiered-select-item' id={item.id} onClick={onClick}>{item.name}</span>
                            <Tier items={item.children} onClick={onClick} />
                        </li>
                    );
                }
            })}
        </ul>
    )
}

function PropertySelect ({ item, onChange }) {
    
    function handleShowToggle(e) {
        e.stopPropagation;
        onChange('Show');
    }

    function handleOrbitToggle(e) {
        e.stopPropagation;
        onChange('Orbit');
    }

    return (
        <>  
            <h3 style={{minWidth: '10em'}}>{item.name} Properties</h3>
            <label className="property-label"> Show Body?
                <input type="checkbox" name="Show" onChange={handleShowToggle} checked={item.show}/>
            </label>
            <label className="property-label"> Show Orbit Path?
                <input type="checkbox" name="Orbit" onChange={handleOrbitToggle} checked={item.orbit}/>
            </label>
        </>
    );

}

export default function TieredSelect({ listObject, setlistObject}) {
    const [selectedItem, setSelectedItem] = useState(listObject[0]);
    const [parentIndex, setParentIndex] = useState(0);

    function handleOnClick(e) { 
        e.stopPropagation;
        const itemDetails = treeUtils.findParentIndexAndObj(e.target.id, [...listObject]);
        setParentIndex(itemDetails.index);
        setSelectedItem(itemDetails.obj);
    }

    function handlePropertyChange( property ) {
        // Need to change the prop, and then handle bubble-up and drill-down when necessary
        let newItem = {
            id: selectedItem.id,
            name: selectedItem.name,
            show: (property === 'Show' ? !selectedItem.show : selectedItem.show),
            orbit: (property === 'Orbit' ? !selectedItem.orbit : selectedItem.orbit),
            children: []
        }
        if (property === 'Orbit' && newItem.orbit)
            newItem.show = true;
        newItem.orbit = newItem.show && newItem.orbit;

        //Drill down, then bubble up and update the list
        newItem.children = treeUtils.drillDownProperties(selectedItem.children, property, newItem);

        setSelectedItem(newItem);

        const newListObject = listObject.map((e, i) => {
            return i !== parentIndex ? e : treeUtils.bubbleUpProperties(listObject[parentIndex], newItem)
        })

        setlistObject(newListObject)
    }

    return (
        <>
            <div className="tiered-select-container">
                <Tier items={listObject} onClick={handleOnClick}/>
            </div>
            <div className="property-container">
                <PropertySelect item={selectedItem} onChange={handlePropertyChange}/>
            </div>
        </>
    );
}