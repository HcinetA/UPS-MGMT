import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createprofprofile } from '../../actions/profprofile';

const CreateProfProfile = ({ createprofprofile, history }) => {
  const [formData, setFormData] = useState({
    email: '',
    tel: '',
    status: '',
    classes: '',
  });
  const { email, tel, status, classes } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createprofprofile(formData, history);
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
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Sélectionnez le statut professionnel</option>
            <option value='Professeur'>Professeur</option>
            <option value='Enseignant'>Enseignant</option>
            <option value='Administration'>Administration</option>
            <option value='Autre'>Autre</option>
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
          Retourner
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfProfile.propTypes = {
  createprofprofile: PropTypes.func.isRequired,
};

export default connect(null, { createprofprofile })(
  withRouter(CreateProfProfile)
);
