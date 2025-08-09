import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import BlogPage from "@/pages/blog";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { AuthContextProvider } from "./contexts/auth";
import PublicRoute from "./components/auth/PublicRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<IndexPage/>} path="/"/>
        <Route element={<BlogPage/>} path="/blog" />
        <Route element={<PublicRoute> <LoginPage/> </PublicRoute>} path="login" />
        <Route element={<PublicRoute> <RegisterPage/> </PublicRoute>} path="register" />
        <Route element={<NotFound/>} path="/*"/>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
