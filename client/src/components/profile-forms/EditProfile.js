import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurentProfile,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    tel: ' ',
  });
  useEffect(() => {
    getCurentProfile();
    setFormData({
      email: loading || !profile.email ? '' : profile.email,
      tel: loading || !profile.tel ? '' : profile.tel,
    });
  }, [loading]);
  const { email, tel } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Créez votre profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Obtenons quelques informations pour
        faire ressortir votre profil
      </p>
      <small>* = champs requis</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='TEL'
            name='tel'
            value={tel}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Retourner{' '}
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { createProfile, getCurentProfile })(
  withRouter(EditProfile)
);
