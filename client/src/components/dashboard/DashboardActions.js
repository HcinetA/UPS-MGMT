import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
      <div class='dash-buttons'>
        <Link to='edit-profile' class='btn btn-light'>
          <i class='fas fa-user-circle text-primary'></i> Editer le profil
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
