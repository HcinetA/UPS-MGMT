import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    classe: '',
    NI: '',
    password: '',
    password2: '',
  });
  const { name, classe, NI, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger');
    } else {
      register({ name, NI, classe, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>S'inscrire</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Créez votre compte
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <label for='cars'>Classe:</label>

          <select name='classe' value={classe} onChange={(e) => onChange(e)}>
            <option value='0'>* Sélectionnez la classe</option>
            <optgroup label='SupTech'>
              <option name='PREP-MP-1'>PREP-MP-1</option>
              <option name='PREP-MP-2'>PREP-MP-2</option>
              <option name='L-IG-1'>L-IG-1</option>
              <option name='L-EEA-1'>L-EEA-1</option>
              <option name='LA-RI-2'>LA-RI-2</option>
              <option name='LA-RI-3'>LA-RI-3</option>
              <option name='LA-IG-2'>LA-IG-2</option>
              <option name='LA-IG-3'>LA-IG-3</option>
              <option name='LF-SI-2'>LF-SI-2</option>
              <option name='LF-SI-3'>LF-SI-3</option>
              <option name='ING-INF-1'>ING-INF-1</option>
              <option name='ING-TEL-2'>ING-TEL-2</option>
              <option name='ING-INF-3'>ING-INF-3</option>
              <option name='ING-EM-1'>ING-EM-1</option>
              <option name='ING-EM-3'>ING-EM-3</option>
              <option name='ING-GC-1'>ING-GC-1</option>
              <option name='ING-GC-2'>ING-GC-2</option>
              <option name='ING-GC-3'>ING-GC-3</option>
              <option name='MP-ST-2'>MP-ST-2</option>
            </optgroup>
            <optgroup label='EcoGest '>
              <option name='L-SG-1'>L-SG-1</option>
              <option name='L-SG-2'>L-SG-2</option>
              <option name='LF-GF-2'>LF-GF-2</option>
              <option name='LF-MFB-2'>LF-MFB-2</option>
              <option name='LA-C-2'>LA-C-2</option>
              <option name='LF-GF-3'>LF-GF-3</option>
              <option name='MP-IE-1'>MP-IE-1</option>
              <option name='MP-CCA-1'>MP-CCA-1</option>
            </optgroup>
            <optgroup label='IPSAT  '>
              <option name='BTP-CE-1'>BTP-CE-1</option>
              <option name='BTP-CE-2'>BTP-CE-2</option>
            </optgroup>
          </select>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Numéro inscription'
            name='NI'
            value={NI}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='7'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='7'
            value={password2}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Vous avez déjà un compte?
        <Link to='/login'>Se connecter</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
