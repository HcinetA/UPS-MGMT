import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
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
      console.log('Success');
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
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
            <option name='cla'></option>
            <option name='Lari1'>Lari1</option>
            <option name='Lari2'>Lari2</option>
            <option name='Larit 3'>Lari3</option>
            <option name='Lfsi 3'>Lfsi3</option>
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
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setAlert })(Register);
