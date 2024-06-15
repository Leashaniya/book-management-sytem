import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import axios from 'axios'
import BookList from './components/BookList';
import BookAdd from './components/BookAdd';
import EditBook from './components/EditBook';
import Home from './components/Home';

function App() {
  axios.defaults.baseURL = "http://localhost:8000"; //  backend server URL
  return (
    <BrowserRouter>
    <>
    <div className='app' >
    <Routes>
    <Route path="/" element={<Home />} />
          <Route path="/book/" element={<BookList />} />
          <Route path="/book/add" element={<BookAdd  />} />   
          <Route path="/book/update/:title" element={< EditBook />} />
          
    </Routes>
    </div>
    </>
    </BrowserRouter>
  )
}

export default App
