import React from 'react'
import '../../styles/Manager/Manager.css'
import LogoutBtn from './LogoutBtn'
import AddAdmin from './AddAdmin'

const ManagerDashBoard = () => {
  return (
    <>
    <div className="manager-nav">
        <h1>Eevent</h1>
        <LogoutBtn />
    </div>
    <div className="dashboard-content">
      <h3>Add an Admin</h3>
      <AddAdmin />
    </div>
    </>
  )
}

export default ManagerDashBoard