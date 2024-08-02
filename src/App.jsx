//Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdvancedSearch from './components/AdvancedSearch';
import Modal from './components/Modal';
import RenderArea from './components/RenderArea';
import SettingsProvider from './context/SettingsProvider';

//Import Helpers and Style
import { buildRequest, flattenSettings, compareFlattened } from './scripts/fetching';
import * as ACTIONS from './context/settings_actions';
import './App.css';

//Import Hooks
import { useState, useEffect} from 'react';
import { useSettings, useSettingsDispatch } from './context/SettingsProvider';

function App() {
  const baseURL = "";

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [flatData, setFlatData] = useState({});
  const [renderData, setRenderData] = useState();
  const settings = useSettings();
  const dispatch = useSettingsDispatch();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(baseURL);
            const json = await response.json();
            
            setFlatData(flattenSettings(json.data.settings));
            setRenderData(JSON.parse(json.data.renderData));
            dispatch({
              type: ACTIONS.SETTINGS,
              StartDate: json.data.settings.startDate,
              EndDate: json.data.settings.endDate,
              MajorBodies: json.data.settings.majorBodies,
              MinorBodies: json.data.settings.minorBodies,
              Missions: json.data.settings.missions
            });
        } catch (error) {
            alert("There was an error loading the page");
            console.log("Error - Initial Load", error);
        }
    };

    fetchData();
  }, [dispatch]);

  function handleRenderRequest(e) {
    const newFlattened = flattenSettings(settings, e.target.name);

    if (!compareFlattened(newFlattened, flatData))
      return;

    const requestBody = buildRequest(newFlattened);

  }

  function handleModalButtonClick() {
    setShowAdvancedSearch(!showAdvancedSearch);
  }

  function handlePresetRequest(e) {
    let dynamicURL = baseURL;
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
            
          setFlatData(flattenSettings(json.data.settings));
          setRenderData(JSON.parse(json.data.renderData));
          dispatch({
            type: ACTIONS.SETTINGS,
            StartDate: json.data.settings.startDate,
            EndDate: json.data.settings.endDate,
            MajorBodies: json.data.settings.majorBodies,
            MinorBodies: json.data.settings.minorBodies,
            Missions: json.data.settings.missions
          });
      } catch (error) {
          alert("There was an error retrieving the selected preset");
          console.log("Error - Preset - ", error);
      }
    };

    fetchData();
    setFlatData();
    setRenderData();
  }

  return (
    <SettingsProvider>
      {showAdvancedSearch && 
      <Modal isOpen={showAdvancedSearch} onClose={() => setShowAdvancedSearch(false)}>
        <AdvancedSearch requestNewRender={handleRenderRequest} />
      </Modal>
      }
      <div className='container'>
        <Navbar 
          openAdvancedSelection={handleModalButtonClick}
          searchOpen={showAdvancedSearch}
          onPresetClick={handlePresetRequest}
        />
        <RenderArea renderItem={renderData}/>
      </div>
      < Footer />
    </ SettingsProvider>
  )
}

export default App
