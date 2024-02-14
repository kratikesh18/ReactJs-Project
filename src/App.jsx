import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  AllPost,
  LoginPage,
  Post,
  SignUpPage,
  UnderConstruction,
} from "./Pages";

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
