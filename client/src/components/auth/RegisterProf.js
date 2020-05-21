import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { registerProf } from '../../actions/pauth';
import PropTypes from 'prop-types';

const RegisterProf = ({ setAlert, registerProf }) => {
  const [formData, setFormData] = useState({
    name: '',
    SN: '',
    password: '',
    password2: '',
  });
  const { name, SN, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger');
    } else {
      registerProf({
        name,
        SN,
        password,
      });
    }
  };
  return (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>S'inscrire</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Créez votre compte
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nom Prenom'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='SN'
            name='SN'
            value={SN}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Mot de passe            '
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirmez le mot de passe
            '
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Vous avez déjà un compte?
        <Link to='/loginprof'>Se connecter</Link>
      </p>
    </Fragment>
  );
};
RegisterProf.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerProf: PropTypes.func.isRequired,
};
export default connect(null, { setAlert, registerProf })(RegisterProf);
