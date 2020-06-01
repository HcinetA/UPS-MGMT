import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
const CommentItem = ({
  postId,
  commentsprof: { _id, text, name, avatar, prof, date },
  pauth,
  deleteComment,
}) => {
  return (
    <Fragment>
      <div class='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${prof}`}>
            <img class='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class='my-1'>{text}</p>
          <p class='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  commentsprof: PropTypes.object.isRequired,
  pauth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pauth: state.pauth,
  comments: state.comments,
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
