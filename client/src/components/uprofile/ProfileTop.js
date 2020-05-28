import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    email,
    tel,
    user: { name, avatar },
  },
}) => {
  return (
    <div class='profile-top bg-primary p-2'>
      <img class='round-img my-1' src={avatar} alt='' />
      <h1 class='large'>{name}</h1>
      <p class='lead'>{email}</p>
      <p class='lead'>{tel}</p>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
