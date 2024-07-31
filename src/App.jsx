//Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdvancedSearch from './components/AdvancedSearch';
import Modal from './components/Modal';
import RenderArea from './components/RenderArea';

//Import Helpers and Style
import getDefault from './default_test';
import * as fetching from './fetching';
import './App.css';

//Import Libs
import { useState, useEffect } from 'react';

function App() {
  const data = getDefault();

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [flatData, setFlatData] = useState({});
  const [renderData, setRenderData] = useState(data.render);
  const [startDate, setStartDate] = useState(data.Settings.StartDate)
  const [endDate, setEndDate] = useState(data.Settings.EndDate)

  useEffect(() => {
    const url = "";

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.slip.advice);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
  }, [flatData]);


  function handleModalButtonClick() {
    setShowAdvancedSearch(!showAdvancedSearch);
  }

  function handleChangeStartDate(e) {
    setStartDate(e.target.value);
  }

  function handleChangeEndDate(e) {
    setEndDate(e.target.value);
  }

  function handleRenderRequest(e) {

  }

  return (
    <>
      {showAdvancedSearch && 
      <Modal isOpen={showAdvancedSearch} onClose={() => setShowAdvancedSearch(false)}>
        <AdvancedSearch 
          startDate={startDate} updateStartDate={handleChangeStartDate}
          endDate={endDate}  updateEndDate={handleChangeEndDate}
          initialMinorBodies={data.Settings.MinorBodies} 
          intialMajorBodies={data.Settings.MajorBodies} 
          initialMissions={data.Settings.Missions}
          requestNewRender={handleRenderRequest}
        />
      </Modal>
      }
      <div className='container'>
        <Navbar 
          openAdvancedSelection={handleModalButtonClick}
          searchOpen={showAdvancedSearch} 
          startDate={startDate}
          endDate={endDate}
          modifyStartDate={handleChangeStartDate} 
          modifyEndDate={handleChangeEndDate}
        />
        <RenderArea renderItem={renderData}/>
      </div>
      < Footer />
    </>
  )
}

export default App
