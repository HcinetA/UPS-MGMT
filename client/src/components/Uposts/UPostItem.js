import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addUlike, removeUlike } from '../../actions/upost';
const UPostItem = ({
  auth,
  addUlike,
  removeUlike,
  upost: {
    _id,
    text,
    name,
    avatar,
    prof,
    document,
    likes,
    comments,
    likesporf,
    commentsprof,
    date,
    classes,
  },
  ShowActions,
}) => (
  <div class='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${prof}`}>
        <img class='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <Link to={`/posts/${classes}`}>
        <h4> {classes}</h4>
      </Link>
      <p class='my-1'>{text}</p>
      {
        // eslint-disable-next-line
        !document == 0 && (
          <a
            href={document}
            target='_blank'
            rel='noopener noreferrer'
            class='btn btn-primary'
          >
            Document{' '}
          </a>
        )
      }
      <p class='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      <Fragment>
        {ShowActions && (
          <Fragment>
            <h4>Réactions Professeurs</h4>
            <i class='fas fa-thumbs-up'></i>
            <span>
              {' '}
              <span>
                {likesporf.length > 0 && <span>{likesporf.length}</span>}
              </span>
            </span>
            <div>
              <h4>Réactions Etudiant</h4>
              <button
                onClick={(e) => addUlike(_id)}
                type='button'
                class='btn btn-light'
              >
                <i class='fas fa-thumbs-up'></i>
                <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>
              <button
                onClick={(e) => removeUlike(_id)}
                type='button'
                class='btn btn-light'
              >
                <i class='fas fa-thumbs-down'></i>
              </button>
              <Link to={`/uposts/${_id}`} class='btn btn-primary'>
                Discussion{' '}
                {comments.length > 0 && (
                  <span class='comment-count'>{comments.length}</span>
                )}
              </Link>
            </div>{' '}
          </Fragment>
        )}
      </Fragment>
    </div>
  </div>
);

UPostItem.defaultProps = {
  ShowActions: true,
};
UPostItem.propTypes = {
  upost: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addUlike: PropTypes.func.isRequired,
  removeUlike: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addUlike, removeUlike })(UPostItem);
