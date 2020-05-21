import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurentProfProfile } from '../../actions/profprofile';

const Pdashboard = ({
  getCurentProfProfile,
  pauth: { prof },
  profprofile: { profprofile, ploading },
}) => {
  useEffect(() => {
    getCurentProfProfile();
  }, []);
  return ploading && profprofile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Tableau de bord</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Bienvenue {prof && prof.name}
      </p>
      {profprofile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>
            Vous n'avez pas encore configuré de profil, veuillez ajouter
            quelques informations
          </p>
          <Link to='/create-profprofile' className='btn btn-primary my-1'>
            Create Profile{' '}
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Pdashboard.propTypes = {
  getCurentProfProfile: PropTypes.func.isRequired,
  pauth: PropTypes.object.isRequired,
  profprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pauth: state.pauth,
  profprofile: state.profprofile,
});
export default connect(mapStateToProps, { getCurentProfProfile })(Pdashboard);
