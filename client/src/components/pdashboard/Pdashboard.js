import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {
  getCurentProfProfile,
  deleteProfAccount,
} from '../../actions/profprofile';
import PDashboardActions from './PDashboardActions';
const Pdashboard = ({
  getCurentProfProfile,
  deleteProfAccount,
  pauth: { prof },
  profprofile: { profprofile, ploading },
}) => {
  useEffect(() => {
    getCurentProfProfile();
  }, [getCurentProfProfile]);
  return ploading && profprofile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Tableau de bord</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Bienvenue {prof && prof.name}
      </p>
      {profprofile !== null ? (
        <Fragment>
          <PDashboardActions />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => deleteProfAccount()}
            >
              <i className='fas fa-user-minus'>Delete My Account</i>
            </button>
          </div>
        </Fragment>
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
  deleteProfAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pauth: state.pauth,
  profprofile: state.profprofile,
});
export default connect(mapStateToProps, {
  getCurentProfProfile,
  deleteProfAccount,
})(Pdashboard);
