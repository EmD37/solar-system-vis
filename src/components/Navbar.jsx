import './Navbar.css'
import { useSettings, useSettingsDispatch } from '../context/SettingsProvider';
import * as ACTIONS from '../context/settings_actions';
import { BASE_URL, flattenSettings } from '../scripts/fetchingUtils';

export default function Navbar({ openAdvancedSelection, searchOpen, handleFlat, handleRender}) {
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

  function handlePresetRequest(e) {
    let dynamicURL = BASE_URL;
    switch (e.target.name) {
      case "Preset1":
        dynamicURL += "preset/1";
        break;
      case "Preset2":
        dynamicURL += "preset/2";
        break;
      case "Preset3":
        dynamicURL += "preset/3";
        break;
      default:
        break;
    }

    const fetchData = async () => {
      try {
          const response = await fetch(dynamicURL);
          const json = await response.json();
            
          handleFlat(flattenSettings(json.data.settings));
          handleRender(JSON.parse(json.data.renderData));
          dispatch({
            type: ACTIONS.SETTINGS,
            startDate: json.data.settings.startDate,
            endDate: json.data.settings.endDate,
            majorBodies: json.data.settings.majorBodies,
            minorBodies: json.data.settings.minorBodies,
            missions: json.data.settings.missions
          });
      } catch (error) {
          alert("There was an error retrieving the selected preset");
          console.log("Error - Preset - ", error);
      }
    };

    fetchData();
  }

  return (
    <div className='nav-bar'>
        <div id="navBarPreset1" className='nav-bar-item'>
          <button disabled={searchOpen} onClick={handlePresetRequest} name="Preset1">Preset 1</button>
        </div>
        <div id="navBarPreset2" className='nav-bar-item'>
          <button disabled={searchOpen} onClick={handlePresetRequest} name="Preset2">Preset 2</button>
        </div>
        <div id="navPreset3" className='nav-bar-item'>
          <button disabled={searchOpen} onClick={handlePresetRequest} name="Preset3">Preset 3</button>
        </div>
        <div id="navBarStartDate" className='nav-bar-item'>
          <p className='nav-bar-text'>Start Date</p>
          <input type='date' disabled={searchOpen} value={settings.startDate} onChange={handleChangeStartDate}/>
        </div>
        <div id="navBarEndDate" className='nav-bar-item'>
          <p className='nav-bar-text'>End Date</p>
          <input type='date' disabled={searchOpen} value={settings.endDate} onChange={handleChangeEndDate} />
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