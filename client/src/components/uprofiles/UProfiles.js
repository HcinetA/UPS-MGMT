import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

const UProfiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'> Etudiants</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'>
              {' '}
              Liste Etuidants dans la plateform
            </i>
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile.id} profile={profile} />
              ))
            ) : (
              <h4> No profiles found </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

UProfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(UProfiles);
