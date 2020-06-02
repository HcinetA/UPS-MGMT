import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ pisAuthenticated, isAuthenticated }) => {
  if (pisAuthenticated) {
    return <Redirect to='/pdashboard' />;
  }
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Intranet UPS</h1>
          <p className='lead'>Cours, Emploi Du temps, Rattrapage et Plus</p>
          <div className='buttons'>
            <Link to='login' className='btn btn-primary'>
              Loign Etudiants
            </Link>
            <Link to='loginprof' className='btn btn-light'>
              Login Professeurs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  pisAuthenticated: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  pisAuthenticated: state.pauth.pisAuthenticated,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
