//Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdvancedSearch from './components/AdvancedSearch';
import Modal from './components/Modal';
import RenderArea from './components/RenderArea';
import SettingsProvider from './context/SettingsProvider';

//Import Helpers and Style
import './App.css';

//Import Hooks
import { useCallback, useState} from 'react';

function App() {
  const baseURL = "http://127.0.0.1:8000/";

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [flatData, setFlatData] = useState({});
  const [renderData, setRenderData] = useState();

  const handleFlat = useCallback((obj) => {setFlatData(obj)}, []);
  const handleRender = useCallback((obj) => {setRenderData(obj)}, []);

  function handleModalButtonClick() {
    setShowAdvancedSearch(!showAdvancedSearch);
  }

  

  return (
    <SettingsProvider 
      baseURL={baseURL} 
      handleFlat={handleFlat} 
      handleRender={handleRender}>
      {showAdvancedSearch && 
      <Modal 
        isOpen={showAdvancedSearch} 
          onClose={() => setShowAdvancedSearch(false)}>
        <AdvancedSearch 
          handleFlat={handleFlat} 
          handleRender={handleRender} 
          currentFlat={flatData} />
      </Modal>
      }
      <div className='container'>
        <Navbar 
          openAdvancedSelection={handleModalButtonClick}
          searchOpen={showAdvancedSearch}
          handleFlat={handleFlat}
          handleRender={handleRender}
        />
        <RenderArea 
          renderItem={renderData}
        />
      </div>
      < Footer />
    </ SettingsProvider>
  )
}

export default App
