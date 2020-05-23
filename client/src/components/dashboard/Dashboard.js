import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurentProfile } from '../../actions/profile';

const Dashboard = ({ getCurentProfile, auth, profile }) => {
  useEffect(() => {
    getCurentProfile();
  }, []);
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getCurentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurentProfile })(Dashboard);
