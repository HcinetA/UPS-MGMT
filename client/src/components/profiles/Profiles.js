import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfProfiles } from '../../actions/profprofile';
const Profiles = ({
  getProfProfiles,
  profprofile: { profprofiles, ploading },
}) => {
  useEffect(() => {
    getProfProfiles();
  }, [getProfProfiles]);
  return (
    <Fragment>
      {ploading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Prof</h1>
          <p className='lead'>
            <i className='fab fa-connectedevelop'></i> Brows and connect with
            Professors
          </p>
          <div className='profiles'>
            {profprofiles.length > 0 ? (
              profprofiles.map((profprofile) => (
                <ProfileItem key={profprofile._id} profprofile={profprofile} />
              ))
            ) : (
              <h4>No profiles found ...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfProfiles: PropTypes.func.isRequired,
  profprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profprofile: state.profprofile,
});
export default connect(mapStateToProps, { getProfProfiles })(Profiles);
