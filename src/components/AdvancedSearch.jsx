import './AdvancedSearch.css';
import TieredSelect from './TieredSelect';
import { useSettings, useSettingsDispatch } from '../context/SettingsProvider';
import * as ACTIONS from '../context/settings_actions';
import { BASE_URL, flattenSettings, compareFlattened, buildRequest } from '../scripts/fetchingUtils';


//Helper Functions


//Components
export default function AdvancedSearch ({ currentFlat, handleFlat, handleRender }) {

    const settings = useSettings();
    const dispatch = useSettingsDispatch();

    function handleChangeStartDate(e) {
        dispatch({
            type: ACTIONS.START_DATE,
            startDate: e.target.value
        });
    }

    function handleChangeEndDate(e) {
        dispatch({
            type: ACTIONS.END_DATE_DATE,
            endDate: e.target.value
        });
    }

    function handleUpdateMajorBodies(list) {
        dispatch({
            type: ACTIONS.MAJOR_BODIES,
            majorBodies: list           
        });
    }

    function handleUpdateMinorBodies(list) {
        dispatch({
            type: ACTIONS.MINOR_BODIES,
            minorBodies: list           
        });
    }

    function handleUpdateMissions(list) {
        dispatch({
            type: ACTIONS.MISSIONS,
            missions: list           
        });
    }

    function handleRenderClick(e) {
        const newFlat = flattenSettings(settings, e.target.name);
    
        if (!compareFlattened(newFlat, currentFlat))
          return;
    
        handleFlat(newFlat);
    
        const request = buildRequest(newFlat, BASE_URL);
    
        const fetchData = async () => {
          try {
              const response = await fetch(request);
              const json = await response.json();
          
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
              alert("There was an error during the render request");
              console.log("Error - Render Request - ", error);
          }
        };
    
        fetchData();
    
      }

    return (
        <form className='search-form'>
            <h2 style={{margin: 0, textAlign: 'center'}}>Advanced Selection</h2>
            <div className='search-grid'>
                <div className='search-grid-row'>
                    <label className='search-grid-cell'>
                        Start Date: <input name='startDate' value={settings.StartDate} onChange={handleChangeStartDate} type='date'/>
                    </label>
                    <label className='search-grid-cell'>
                        End Date: <input name='endDate' value={settings.EndDate} onChange={handleChangeEndDate} type='date'/>
                    </label>
                    <div className='search-grid-cell'>
                        <button className='search-button' type='button' onClick={handleRenderClick} name='render'>Render</button>
                        <button className='search-button' type='button' onClick={handleRenderClick} name='export'>Export</button>
                    </div>
                </div>
                <div className="search-grid-row">
                    <div className="search-grid-column">
                        <h3 style={{marginTop: 0, marginBottom: '0.5em', textAlign: 'center'}}>Planets</h3>
                        <TieredSelect listObject={settings.majorBodies} setlistObject={handleUpdateMajorBodies} />
                    </div>
                    <div className="search-grid-column">
                        <h3 style={{marginTop: 0, marginBottom: '0.5em', textAlign: 'center'}}>Minor Bodies</h3>
                        <TieredSelect listObject={settings.minorBodies} setlistObject={handleUpdateMinorBodies}/>
                    </div>
                    <div className="search-grid-column">
                        <h3 style={{marginTop: 0, marginBottom: '0.5em', textAlign: 'center'}}>Missions</h3>
                        <TieredSelect listObject={settings.missions} setlistObject={handleUpdateMissions} />
                    </div>
                </div>
            </div>
        </form>
    );
}