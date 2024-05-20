import { useState } from 'react'
import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import axios from 'axios'
import BookList from './components/BookList';
import BookAdd from './components/BookAdd';
import EditBook from './components/EditBook'

function App() {
  axios.defaults.baseURL = "http://localhost:8000"; //  backend server URL
  return (
    <BrowserRouter>
    <>
    <div className='app' >
    <Routes>
          {/* <Route path='/' element={<Home/>}/>
          <Route path='/subs' element={<Subscription/>}/>
          <Route path='/user/get/:id' element={<Profile/>}/>
          <Route path="/user/register-manager" element={<ManagerRegister />} />      
          <Route path="/user/allmanagers" element={<ManagerList />} />
          <Route path="/user/allcustomers" element={<CustomerList />} />  
          <Route path="/user/register-admin" element={<AdminRegister />} />
          <Route path="/user/allAdmins" element={<AdminList />} />
          <Route path="/user/update-manager/:Id" element={<EditManager />} />
          <Route path="/user/register-customer" element={<CustomerRegister />}/>
          <Route path="/user/update-customer/:Id" element={<EditCustomer/>} />
          <Route path="/user/update-admin/:Id" element={<EditAdmin />} />
          <Route path="/user/login-customer" element={<CustomerLogin />} />
          <Route path="/user/login-adminAndManger" element={<AdminManagerLogin />}/>
          <Route path="/user/adminHome" element={<AdminHome />}/>
          <Route path="/user/managerHome" element={<ManagerHome />}/> */}
          {/* Subscription */}
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
