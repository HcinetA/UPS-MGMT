import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profprofile: {
    classes,
    prof: { name },
  },
}) => {
  return (
    <Fragment>
      <div class='profile-about bg-light p-2'>
        <div class='line'></div>
        <h2 class='text-primary'> Classes</h2>
        <div class='skills'>
          {classes.map((classes, index) => (
            <div key={index} className='p-1'>
              <i className='fas fa-book-reader'> {classes}</i>{' '}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

ProfileAbout.propTypes = {
  profprofile: PropTypes.object.isRequired,
};

export default ProfileAbout;
