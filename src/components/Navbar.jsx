import './Navbar.css'

export default function Navbar({ openAdvancedSelection, searchOpen, startDate, endDate, modifyStartDate, modifyEndDate }) {

    return (
    <div className='nav-bar'>
        <div id="navBarPreset1" className='nav-bar-item'>
        <button disabled={searchOpen} name="Preset1">Preset 1</button>
        </div>
        <div id="navBarPreset2" className='nav-bar-item'>
        <button disabled={searchOpen} name="Preset2">Preset 2</button>
        </div>
        <div id="navPreset3" className='nav-bar-item'>
          <button disabled={searchOpen} name="Preset3">Preset 3</button>
        </div>
        <div id="navBarStartDate" className='nav-bar-item'>
          <p className='nav-bar-text'>Start Date</p>
          <input type='date' disabled={searchOpen} value={startDate} onChange={modifyStartDate}/>
        </div>
        <div id="navBarEndDate" className='nav-bar-item'>
          <p className='nav-bar-text'>End Date</p>
          <input type='date' disabled={searchOpen} value={endDate} onChange={modifyEndDate} />
        </div>
        <div id="navBarAdvancedSelection" className='nav-bar-item'>
          <button onClick={openAdvancedSelection}>Advanced Selection</button>
        </div>
        <div id="navBarPreferences" className='nav-bar-item'>
          <button>Preferences</button>
        </div>
      </div>
      );
}