import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { logoutProf } from '../../actions/pauth';
const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  pauth: { pisAuthenticated, ploading },
  logoutProf,
}) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />
          {''}
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </ul>
  );
  const pauthLinks = (
    <ul>
      <li>
        <Link to='/pdashboard'>
          <i className='fas fa-user' />

          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logoutProf} href='#!'>
          <i className='fas fa-sign-out-alt' />
          {''}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a href='#!'>Professeurs</a>
      </li>
      <li>
        <Link to='register'>Register Étudiant </Link>
      </li>
      <li>
        <Link to='registerprof'>Register Professeurs</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-university'></i> Intranet Ups
        </Link>
      </h1>
      {!loading && !ploading && (
        <Fragment>
          {' '}
          {isAuthenticated
            ? authLinks
            : pisAuthenticated
            ? pauthLinks
            : guestLinks}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  logoutProf: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  pauth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  pauth: state.pauth,
});
export default connect(mapStateToProps, { logout, logoutProf })(Navbar);
