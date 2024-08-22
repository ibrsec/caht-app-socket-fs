import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
// import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="" element={<Register />} />
        </Route>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
        </Route>
        {/* <Route path="stock" element={<PrivateRoute />}> */}
        {/* <Route path="" element={<Dashboard />}> */}
        {/* <Route index element={<Home />}/> */}
        {/* <Route path="purchases" element={<Purchases />} /> */}
        {/* <Route path="sales" element={<Sales />} /> */}
        {/* <Route path="products" element={<Products />} /> */}
        {/* <Route path="firms" element={<Firms />} /> */}
        {/* <Route path="brands" element={<Brands />} /> */}
        {/* </Route> */}
        {/* </Route> */}
        {/* <Route path="*" element={<NotFound/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
