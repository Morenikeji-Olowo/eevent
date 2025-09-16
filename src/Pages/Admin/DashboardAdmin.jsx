import React from "react";
import AdminLogout from "./AdminLogout";
import FetchPendingEvents from "./FetchPendingEvents";

const DashboardAdmin = () => {
  return (
    <>
      <div className="manager-nav">
        <h1>Eevent</h1>
        <AdminLogout />
      </div>
      <div className="pendingevents">
        <FetchPendingEvents />
      </div>
    </>
  );
};

export default DashboardAdmin;
