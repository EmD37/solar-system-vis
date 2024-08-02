import './Navbar.css'
import { useSettings, useSettingsDispatch } from '../context/SettingsProvider';
import * as ACTIONS from '../context/settings_actions';

export default function Navbar({ openAdvancedSelection, searchOpen, onPresetClick}) {
  const settings = useSettings();
  const dispatch = useSettingsDispatch();

  function handleChangeStartDate(e) {
    dispatch({
      type: ACTIONS.START_DATE,
      StartDate: e.target.value
    });
  }

  function handleChangeEndDate(e) {
    dispatch({
      type: ACTIONS.END_DATE,
      EndDate: e.target.value
    });
  }

  return (
    <div className='nav-bar'>
        <div id="navBarPreset1" className='nav-bar-item'>
          <button disabled={searchOpen} onClick={onPresetClick} name="Preset1">Preset 1</button>
        </div>
        <div id="navBarPreset2" className='nav-bar-item'>
          <button disabled={searchOpen} onClick={onPresetClick} name="Preset2">Preset 2</button>
        </div>
        <div id="navPreset3" className='nav-bar-item'>
          <button disabled={searchOpen} onClick={onPresetClick} name="Preset3">Preset 3</button>
        </div>
        <div id="navBarStartDate" className='nav-bar-item'>
          <p className='nav-bar-text'>Start Date</p>
          <input type='date' disabled={searchOpen} value={settings.StartDate} onChange={handleChangeStartDate}/>
        </div>
        <div id="navBarEndDate" className='nav-bar-item'>
          <p className='nav-bar-text'>End Date</p>
          <input type='date' disabled={searchOpen} value={settings} onChange={handleChangeEndDate} />
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