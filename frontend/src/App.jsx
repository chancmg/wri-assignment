import "leaflet/dist/leaflet.css";
import { Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Distance from "./container/Distance";
import Home from "./container/Home";
import Upload from "./container/Upload";


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <header className="p-4 pb-0 border-b shadow-lg bg-gray-100 md:flex md:items-center md:justify-between md:pb-4">
        <div className="mb-4 flex items-center justify-between md:mb-0">
          <h1 className="leading-none text-2xl text-gray-darkest">
            <a
              href="@"
              className="no-underline text-gray-darkest hover:text-black"
            >
              Depot Allocation
            </a>
          </h1>
          <a href="#" className="text-black md:hidden hover:text-orange">
            <i className="fa fa-2x fa-bars"></i>
          </a>
        </div>

        <nav>
          <ul className="list-reset md:flex md:items-center">
            <li className="md:ml-4">
              <Link
                to="/"
                className="block py-2 text-grey-darkest no-underline md:border-none md:p-0 hover:underline"
              >
                Home
              </Link>
            </li>
            <li className="md:ml-4">
              <Link
                to="/upload"
                className="block py-2 text-grey-darkest no-underline md:border-none md:p-0 hover:underline"
              >
                Add/Upload
              </Link>
            </li>
            
            <li className="md:ml-4">
              <Link
                to="/distance"
                className="block py-2 text-grey-darkest no-underline md:border-none md:p-0 hover:underline"
              >
                Distance Matrix
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/distance" element={<Distance />} />
      </Routes>
    </div>
  );
}

export default App;
