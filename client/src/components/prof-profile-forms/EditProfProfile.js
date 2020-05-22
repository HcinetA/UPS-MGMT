import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createprofprofile,
  getCurentProfProfile,
} from '../../actions/profprofile';

const EditProfProfile = ({
  profprofile: { profprofile, ploading },
  createprofprofile,
  history,
  getCurentProfProfile,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    tel: '',
    status: '',
    classes: '',
  });
  useEffect(() => {
    getCurentProfProfile();
    setFormData({
      email: ploading || !profprofile.email ? '' : profprofile.email,
      tel: ploading || !profprofile.tel ? '' : profprofile.tel,
      status: ploading || !profprofile.status ? '' : profprofile.status,
      classes:
        ploading || !profprofile.classes ? '' : profprofile.classes.join(','),
    });
  }, [ploading]);
  const { email, tel, status, classes } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createprofprofile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Créez votre profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Obtenons quelques informations pour
        faire ressortir votre profil
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
        </div>
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
            placeholder='Tel'
            name='tel'
            value={tel}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Classes'
            name='classes'
            value={classes}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Veuillez utiliser des valeurs séparées par des virgules (eg.
            LARI1,LARI2,LFSI1,LSFG1)
          </small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/pdashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfProfile.propTypes = {
  createprofprofile: PropTypes.func.isRequired,
  profprofile: PropTypes.object.isRequired,
  getCurentProfProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profprofile: state.profprofile,
});
export default connect(mapStateToProps, {
  createprofprofile,
  getCurentProfProfile,
})(withRouter(EditProfProfile));
