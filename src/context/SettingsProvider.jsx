import { createContext, useReducer, useContext } from "react"
import * as ACTIONS from './settings_actions';

const SettingsContext = createContext(null);
const SettingsDispatchContext = createContext(null);

export default function SettingsProvider({children, initialSettings}) {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

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
          StartDate: action.StartDate,
          EndDate: action.EndDate,
          MajorBodies: action.MajorBodies,
          MinorBodies: action.MinorBodies,
          Missions: action.Missions
        }
      case ACTIONS.START_DATE:
        return {
          ...settings,
          StartDate: action.StartDate
        }
      case ACTIONS.END_DATE:
        return {
          ...settings,
          EndDate: action.EndDate
        }
      case ACTIONS.MINOR_BODIES:
        return {
          ...settings,
          MinorBodies: action.MinorBodies
        }
      case ACTIONS.MAJOR_BODIES:
        return {
          ...settings,
          MajorBodies: action.MajorBodies
        }
      case ACTIONS.MISSIONS:
        return {
          ...settings,
          Missions: action.Missions
        }
      default:
        return;
    }
  }

  