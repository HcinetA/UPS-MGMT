import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profprofile: {
    prof: { _id, name, avatar },
    status,
    email,
    tel,
    classes,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2> {name}</h2>
        <p>{status}</p>
        <p className='my-1'>
          {email} <span>|| {tel}</span>
        </p>

        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {classes.slice(0, 4).map((classes, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'> {classes}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profprofile: PropTypes.object.isRequired,
};

export default ProfileItem;
