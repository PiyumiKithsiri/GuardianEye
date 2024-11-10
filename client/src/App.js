
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HsaNavbar from './Components/HsaNavbar';


import Patients from './Pages/HSA/Patients';
import SendNotification from './Pages/HSA/SendNotification';
import ViewNotification from './Pages/HSA/ViewNotification';
import MissingPatients from './Pages/HSA/MissingPatients';
import AddPatients from './Pages/HSA/AddPatients';
import Dashboard2 from './Pages/HSA/Dashboard2';

import CctvNavbar from './Components/CctvNavbar';
import PoliceNavbar from './Components/PoliceNavbar';
import PoliceTable from './Pages/Police/PoliceTable';
import PoliceHospital from './Pages/Police/PoliceHospital';
import Policecctv from './Pages/Police/PoliceCctv';
import CctvForm from './Pages/CctvUnit/CctvForm';
import TrainModel from './Pages/CctvUnit/TrainModel';
import CctvViewNotification from './Pages/CctvUnit/cctvViewNotification';
import Login from './Pages/login';




function App() {
  return (
    <div>
    
      
    
      <BrowserRouter>
       
       <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/hsadashboard' element={<Dashboard2/>}/>
         <Route path='/patients' element={<Patients/>}/>
         <Route path='/sendnotification' element={<SendNotification/>}/>
         <Route path='/viewnotification' element={<ViewNotification/>}/>
         <Route path='/policeViewnotification' element={<PoliceHospital/>}/>
         <Route path='/cctvviewnotification' element={<CctvViewNotification/>}/>
         <Route path='/missingpatients' element={<MissingPatients/>}/> 
         <Route path='/addpatients' element={<AddPatients/>}/>

        {/* Police dashboard */}
         <Route path="/police_dashboard" element={<PoliceTable/>} />
         <Route path="/police_cctv_dashboard" element={<Policecctv/>} />

        {/* CCTV Dashboard */}
        <Route path="/cctv_dashboard" element={<CctvForm/>} />
        <Route path="/trainmodel" element={<TrainModel/>} />

       



      
         
       </Routes>
      </BrowserRouter>
       

       
{/*
      <BrowserRouter>
        <PoliceNavbar/>
        
       <Routes>
           <Route path="/" element={<PoliceTable/>} />
           <Route path="/policeViewnotification" element={<PoliceHospital/>} />
           <Route path="/policecctv" element={<Policecctv/>} />
       </Routes>
      </BrowserRouter>

      
 
        <BrowserRouter>
        <CctvNavbar/>
         <Routes>
           <Route path="/" element={<CctvForm/>} />
           <Route path="/cctvviewnotification" element={<CctvViewNotification/>} />
         </Routes>
        </BrowserRouter>
*/} 
       
    </div>
  );
}

export default App;
