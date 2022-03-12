import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import DataService from './service/DataService';
// import Home from './components/Home';
import Categories from './components/Categories';
import Cart from './components/Cart';
import Consumables from './components/Categories/Consumables';
import Decorations from './components/Categories/Decorations';
import Pizza from './components/Categories/Pizza';

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

  React.useEffect(() => {
    DataService.loadData(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/categories" />} />
          <Route path="/categories" element={<Categories />}>
            <Route path="" element={<Navigate to="consumables" />} />
            <Route path="consumables" element={<Consumables data={data} />} />
            <Route path="decorations" element={<Decorations data={data} />} />
            <Route path="pizza" element={<Pizza data={data} />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      {/* {data.loading ? <div>Loading...</div> : 
        data.error ? <div>Error</div> :
        <div>
          {data.data.menu.map(item => (
            <div>
              <h3>{item.category}</h3>
              <p>{item.fooddescription}</p>
            </div>
          ))}
        </div>
      } */}
    </div>
  );
}

export default App;
