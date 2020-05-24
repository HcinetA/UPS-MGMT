import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfProfileById } from '../../actions/profprofile';
import { Link } from 'react-router-dom';
const Profile = ({
  getProfProfileById,
  profprofile: { profprofile, ploading },
  auth,
  pauth,
  match,
}) => {
  useEffect(() => {
    getProfProfileById(match.params.id);
  }, [getProfProfileById]);

  return (
    <Fragment>
      {profprofile === null || ploading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to profiles
          </Link>
          {pauth.pisAuthenticated &&
            pauth.ploading === false &&
            pauth.prof._id === profprofile.prof._id && (
              <Link to='/edit-pprofile' className='btn btn-dark'>
                Edit profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            <ProfileTop profprofile={profprofile} />
            <ProfileAbout profprofile={profprofile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfProfileById: PropTypes.func.isRequired,
  profprofile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  pauth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profprofile: state.profprofile,
  pauth: state.pauth,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfProfileById })(Profile);
