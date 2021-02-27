import React from 'react';
import { Link} from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/create-bank" className="btn btn-light"
      ><i className="fas fa-user-circle text-primary"></i> Edit Banks</Link
      >
      <Link to="/add-experience" className="btn btn-light"
      ><i className="fab fa-black-tie text-primary"></i> Add Bank</Link
      >
    </div>
  );
};

export default DashboardActions;
