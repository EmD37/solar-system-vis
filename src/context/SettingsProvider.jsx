import { createContext, useReducer, useContext, useEffect, useState } from "react"
import * as ACTIONS from './settings_actions';
import { flattenSettings, BASE_URL } from "../scripts/fetchingUtils";

const SettingsContext = createContext(null);
const SettingsDispatchContext = createContext(null);

export default function SettingsProvider({children, handleRender, handleFlat}) {
  const [settings, dispatch] = useReducer(settingsReducer, {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(BASE_URL);
            const json = await response.json();
            
            handleFlat(flattenSettings(json.data.settings, "render"));
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
            alert("There was an error loading the page");
            console.log("Error - Initial Load", error);
            setError(error);
        } finally {
          setLoading(false);
        }
    };

    fetchData();
  }, [handleFlat, handleRender]);

  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return(
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSettingsDispatch() {
  return useContext(SettingsDispatchContext);
}

function settingsReducer(settings, action) {
    switch (action.type) {
      case ACTIONS.SETTINGS:
        return {
            startDate: action.StartDate,
            endDate: action.EndDate,
            majorBodies: action.MajorBodies,
            minorBodies: action.MinorBodies,
            missions: action.Missions
        }
      case ACTIONS.START_DATE:
        return {
          ...settings,
          startDate: action.StartDate
        }
      case ACTIONS.END_DATE:
        return {
          ...settings,
          endDate: action.EndDate
        }
      case ACTIONS.MINOR_BODIES:
        return {
          ...settings,
          minorBodies: action.MinorBodies
        }
      case ACTIONS.MAJOR_BODIES:
        return {
          ...settings,
          majorBodies: action.MajorBodies
        }
      case ACTIONS.MISSIONS:
        return {
          ...settings,
          missions: action.Missions
        }
      default:
        return settings;
    }
  }

  