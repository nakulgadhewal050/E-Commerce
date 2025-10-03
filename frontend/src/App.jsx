import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Nav from './components/Nav';
import { useContext } from 'react';
import { userDataContext } from './context/UserContext';
import About from './pages/About';
import Collection from './pages/Collection.jsx';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Productdetails from './pages/Productdetails.jsx';
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Order from './pages/Order.jsx';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound.jsx';
import Ai from './components/Ai.jsx';



function App() {

  
  const { userData } = useContext(userDataContext)
  const location = useLocation()


  return (
    <>
      {userData && <Nav />}
      <Routes>

        <Route path='/login' element={userData ? (<Navigate to={location.state?.from || "/"} />) : (<Login />)} />
        <Route path='/signup' element={userData ? (<Navigate to={location.state?.from || "/"} />) : (<Signup />)} />
        <Route path='/' element={userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/about' element={userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/collection' element={userData ? <Collection /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/product' element={userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/contact' element={userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/cart' element={userData ? <Cart /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/placeorder' element={userData ? <PlaceOrder /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/order' element={userData ? <Order/> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='*' element={<NotFound/>}/>
        <Route path='/productdetail/:productId' element={userData ? <Productdetails /> : <Navigate to="/login" state={{ from: location.pathname }} />}/>       
      </Routes>
      <Ai/>
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
  );
}

export default App;
