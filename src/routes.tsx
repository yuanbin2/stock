import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import MycommentPage from "./pages/MycommentPage";
import MydetailPage from "./pages/MydetailPage";
import MyordersPage from "./pages/MyordersPage";
import NewsPage from "./pages/NewsPage";
import MystockPage from "./pages/MystockPage";
import StockdetailPage from "./pages/StockdetailPage";
import NewsdetailPage from "./pages/NewsdetailPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const AppRouter = () => {
  const access = localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {access ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path=":id" element={<StockdetailPage />} />
            <Route path="mycomment" element={<MycommentPage />} />
            <Route path="mydetail" element={<MydetailPage />} />
            <Route path="myorder" element={<MyordersPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:id" element={<NewsdetailPage />} />
            <Route path="mystock" element={<MystockPage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
