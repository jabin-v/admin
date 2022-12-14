import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import {store} from './app/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import App from './App';
import {BrowserRouter,Route,Router,Routes} from 'react-router-dom'
import { categoriesApiSlice } from './features/categories/categoriesApiSlice';
import { productsApiSlice } from './features/products/productsApiSlice';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>

     <BrowserRouter>
     <Routes>
          <Route path='/*' element={<App/>}/>
      </Routes>
     </BrowserRouter>

    </Provider>
  </React.StrictMode>
);



