import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { AuthContextProvider } from "./contexts/auth";
import PublicRoute from "./components/auth/PublicRoute";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<IndexPage/>} path="/"/>
        <Route element={<DocsPage/>} path="/docs" />
        <Route element={<PricingPage/>} path="/pricing" />
        <Route element={<BlogPage/>} path="/blog" />
        <Route element={<PrivateRoute> <AboutPage/> </PrivateRoute>} path="/about" />
        <Route element={<PublicRoute> <LoginPage/> </PublicRoute>} path="login" />
        <Route element={<PublicRoute> <RegisterPage/> </PublicRoute>} path="register" />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
