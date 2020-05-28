import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    email,
    tel,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} className='round-img' alt=''></img>
      <div>
        <h2>{name}</h2>
        <p className='my-'>{email}</p>
        <p className='my-'>{tel}</p>
        <Link to={`/uprofile/${_id}`} className='btn btn-primary'>
          Voir Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
