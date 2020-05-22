import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const PDashboardActions = () => {
  return (
    <Fragment>
      <div class='dash-buttons'>
        <Link to='/edit-pprofile' class='btn btn-light'>
          <i class='fas fa-user-circle text-primary'></i> Edit Profile
        </Link>
      </div>
    </Fragment>
  );
};
export default PDashboardActions;
