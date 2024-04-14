import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/students"
            element={
              <PrivateRouter>
                <ProductList />
              </PrivateRouter>
            }
          />
          <Route
            path="/students/add"
            element={
              <PrivateRouter>
                <AddProduct />
              </PrivateRouter>
            }
          />
          <Route
            path="/students/edit/:id"
            element={
              <PrivateRouter>
                <EditProduct />
              </PrivateRouter>
            }
          />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
