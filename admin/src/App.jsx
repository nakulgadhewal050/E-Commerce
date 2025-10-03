import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Lists from './pages/Lists';
import Orders from './pages/Orders';
import Login from './pages/Login';
import { useContext } from 'react';
import { adminDataContext } from './context/AdminContext.jsx';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  let { adminData } = useContext(adminDataContext) 

  return (
    <>
    
      {!adminData ? (
        <Login />
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/list' element={<Lists />} />
          <Route path='/order' element={<Orders />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      )}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App