import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Authenticate from "./Pages/Authenticate/Authenticate";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import CollectData from "./Pages/CollectingInfoOnLoad/CollectData";
import DashBoard from "./Pages/DashBoard/DashBoard";
import DynamicDisplay from "./Components/DashBoard/DynamicDisplay";
import ProtectedRoute from "./Components/ProtectedRoute";
import CreatePost from "./Components/DashBoard/CreatePost";
import Explore from "./Components/DashBoard/Explore";
import SearchUserResult from "./Components/DashBoard/SearchUserResult";
import PlanEvent from "./Components/DashBoard/PlanEvent";
import "./App.css";
import Category from "./Components/Event/Category";
import EventForm from "./Components/Event/EventForm";
import EventFeed from "./Components/Event/EventFeed";
import EventDescription from "./Components/Event/EventDescription";
import ProfileInfo from "./Components/DashBoard/ProfileInfo";
import ChatSection from "./Components/Chats/ChatSection";
import Messages from "./Components/Chats/Messages";
import { WelcomeManager } from "./Components/Manager/Welcome";
import ManagerDashBoard from "./Components/Manager/DashBoard";
import WelcomeAdmin from "./Pages/Admin/WelcomeAdmin";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import ProtectedRouteAdmin from "./Pages/Admin/ProtectedRouteAdmin";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Settiings from "./Components/Settings/Settiings";
const App = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route
          path="/getDetails"
          element={
            <ProtectedRoute>
              <CollectData />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashBoard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        >
          {/* Default redirect to /feed */}
          <Route index element={<DynamicDisplay />} />
          <Route path="feed" element={<DynamicDisplay />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="settings" element={<Settiings />} />
          <Route path="explore" element={<Explore />} />
          <Route
            path="searchUserResult/:userId"
            element={<SearchUserResult />}
          />
          <Route path="plan-event" element={<PlanEvent />} />
          <Route path="event-category-select" element={<Category />} />
          <Route path="event-main-form" element={<EventForm />} />
          <Route path="event-feed" element={<EventFeed />} />
          <Route
            path="event-description/:eventId"
            element={<EventDescription />}
          />
          <Route path="profile-info" element={<ProfileInfo />} />
          <Route path="chat-section" element={<ChatSection />} />
          <Route path="messages-section/:friendId" element={<Messages />} />
        </Route>

        <Route path="/manager" element={<WelcomeManager />} />
        <Route path="/manager-dashboard" element={<ManagerDashBoard />} />

        <Route path="/admin" element={<WelcomeAdmin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRouteAdmin>
              <DashboardAdmin />
            </ProtectedRouteAdmin>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
