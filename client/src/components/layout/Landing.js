import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ pisAuthenticated }) => {
  if (pisAuthenticated) {
    return <Redirect to='/pdashboard' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Intranet Ups</h1>
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
};
const mapStateToProps = (state) => ({
  pisAuthenticated: state.pauth.pisAuthenticated,
});
export default connect(mapStateToProps)(Landing);
