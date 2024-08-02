import './AdvancedSearch.css';
import TieredSelect from './TieredSelect';
import { useSettings, useSettingsDispatch } from '../context/SettingsProvider';
import * as ACTIONS from '../context/settings_actions';


//Helper Functions


//Components
export default function AdvancedSearch ({ requestNewRender }) {

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
            type: ACTIONS.END_DATE_DATE,
            EndDate: e.target.value
        });
    }

    function handleUpdateMajorBodies(list) {
        dispatch({
            type: ACTIONS.MAJOR_BODIES,
            MajorBodies: list           
        });
    }

    function handleUpdateMinorBodies(list) {
        dispatch({
            type: ACTIONS.MINOR_BODIES,
            MinorBodies: list           
        });
    }

    function handleUpdateMissions(list) {
        dispatch({
            type: ACTIONS.MISSIONS,
            Missions: list           
        });
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
                        <button className='search-button' type='button' onClick={requestNewRender} name='render'>Render</button>
                        <button className='search-button' type='button' onClick={requestNewRender} name='export'>Export</button>
                    </div>
                </div>
                <div className="search-grid-row">
                    <div className="search-grid-column">
                        <h3 style={{marginTop: 0, marginBottom: '0.5em', textAlign: 'center'}}>Planets</h3>
                        <TieredSelect listObject={settings.MajorBodies} setlistObject={handleUpdateMajorBodies} />
                    </div>
                    <div className="search-grid-column">
                        <h3 style={{marginTop: 0, marginBottom: '0.5em', textAlign: 'center'}}>Minor Bodies</h3>
                        <TieredSelect listObject={settings.MinorBodies} setlistObject={handleUpdateMinorBodies}/>
                    </div>
                    <div className="search-grid-column">
                        <h3 style={{marginTop: 0, marginBottom: '0.5em', textAlign: 'center'}}>Missions</h3>
                        <TieredSelect listObject={settings.Missions} setlistObject={handleUpdateMissions} />
                    </div>
                </div>
            </div>
        </form>
    );
}