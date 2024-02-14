import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import UnderConstruction from "./Pages/UnderConstruction.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import AllPost from "./Pages/AllPost.jsx";
import Post from "./Pages/Post.jsx";
import Layout from "./Pages/Layout.jsx";

function App() {
  return (
    <div>
      <Layout />;
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/all-posts" element={<AllPost />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </div>
  );
}

export default App;
