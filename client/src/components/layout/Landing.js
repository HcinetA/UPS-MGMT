import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Intranet Ups</h1>
          <p className='lead'>Cours, Emploi Du temps, Rattrapage et Plus</p>
          <div className='buttons'>
            <Link to='login' className='btn btn-primary'>
              Loign Etudiants
            </Link>
            <Link to='login' className='btn btn-light'>
              Login Professeurs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
