import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
const LoginProf = () => {
  const [formData, setFormData] = useState({
    SN: '',
    password: '',
  });
  const { SN, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('SUCCESS');
  };
  return (
    <Fragment>
      {' '}
      <h1 className='large text-primary'>Se connecter</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Connectez-vous à votre compte
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
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

        <input type='submit' className='btn btn-primary' value='Se connecter' />
      </form>
      <p className='my-1'>
        Je n'ai pas de compte ?<Link to='/registerprof'>S'inscrire</Link>
      </p>
    </Fragment>
  );
};

export default LoginProf;
