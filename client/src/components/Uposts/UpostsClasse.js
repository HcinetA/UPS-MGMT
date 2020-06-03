import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getUpostClasse } from '../../actions/upost';
import UPostItem from './UPostItem';
const UpostsClasse = ({ getUpostClasse, upost: { posts, loading }, match }) => {
  useEffect(() => {
    getUpostClasse(match.params.classe);
  }, [getUpostClasse, match.params.classe]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/uposts' className='btn'>
        Retour aux posts
      </Link>
      <h1 className='large text-primary'> Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'> Bienvenue</i>
      </p>
      <div className='posts'>
        {posts.map((upost) => (
          <UPostItem key={upost._id} upost={upost} />
        ))}
      </div>
    </Fragment>
  );
};

UpostsClasse.propTypes = {
  getUpostClasse: PropTypes.func.isRequired,
  upost: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  upost: state.upost,
});
export default connect(mapStateToProps, { getUpostClasse })(UpostsClasse);
