import React, { Fragment } from 'react';

const Notfound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'> Page non trouvée</i>
      </h1>
      <p className='large'> Désolé, cette page n'existe pas</p>
    </Fragment>
  );
};

export default Notfound;
