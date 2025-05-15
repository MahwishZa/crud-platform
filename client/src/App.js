import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Create from "./pages/Blog_Posts/Create";
import Edit from "./pages/Comments/Edit"
import Footer from './components/Footer';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Update from "./pages/Blog_Posts/Update";
import User from "./pages/User";
import Write from "./pages/Comments/Write"
import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation();
  const noFooterRoutes = ["/login", "/register", "/create-blog", "/blog-details/:id", "/create-comment", "/update-comment/:id"];
  const noNavbarRoutes = ["/login", "/register"]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Toaster />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/my-blogs" element={<User />} />
          <Route path="/blog-details/:id" element={<Update />} />
          <Route path="/update-comment/:id" element={<Edit />} />
          <Route path="/create-blog" element={<Create />} />
          <Route path="/create-comment" element={<Write />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  )
}

export default App
