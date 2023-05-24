import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import './App.css';
import DisplayUsers from './DisplayUsers';
import Form from './Form';


function App() {


  return (
    <div className="App">
 
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form/>} />
        <Route path='/allUsers' element={<DisplayUsers/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
