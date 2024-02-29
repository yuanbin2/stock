import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import MycommentPage from "./pages/MycommentPage";
import MydetailPage from "./pages/MydetailPage";
import MyordersPage from "./pages/MyordersPage";
import NewsPage from "./pages/NewsPage";
import MystockPage from "./pages/MystockPage";
import StockdetailPage from "./pages/StockdetailPage";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path=":id" index element={<StockdetailPage />} />

        <Route path="mycomment" index element={<MycommentPage />} />
        <Route path="mydetail" index element={<MydetailPage />} />
        <Route path="myorder" index element={<MyordersPage />} />
        <Route path="news" index element={<NewsPage />} />
        <Route path="mystock" index element={<MystockPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
