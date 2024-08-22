 
// import AppRouter from "./router/AppRouter"; 
import { ToastContainer } from "react-toastify";
import  { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SideBar from "./components/sidebar/SideBar";
import Home from "./pages/Home";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="App p-4 h-screen flex items-center justify-center">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
          {/* <Home /> */}
        </PersistGate>
      </Provider>
      <Toaster />
    </div>
  );
}

export default App;
