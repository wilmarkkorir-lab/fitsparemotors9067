// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import {  Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import AddProduct from './components/AddProduct';
import GetProducts from './components/GetProduct';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



import MakePayment from './components/MakePayment';
import AboutUs from './components/AboutUs';
import Location from './components/location';


function App() {
  return (
    <Router>
        <div className="App">
          <header className="App-header">
          <h1>Fitspare Motors</h1>
          </header>

         
      
          
         
        </div>

        <Routes>
          <Route path='/makepayment' element={<MakePayment/>}/>
         
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/' element={<GetProducts/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/location' element={<Location/>}/>
        
        </Routes>
    </Router>
  );
}

export default App;