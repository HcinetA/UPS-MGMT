import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text: '',
    classes: ' ',
    document: '',
  });
  const { text, classes, document } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({
      text: '',
      classes: '',
      document: '',
    });
  };
  return (
    <div class='post-form' onSubmit={(e) => onSubmit(e)}>
      <div class='bg-primary p'>
        <h3>Dis quelquechose...</h3>
      </div>
      <form class='form my-1'>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => onChange(e)}
          required
        ></textarea>

        <div className='form-group'>
          <label for='cars'>Classe:</label>

          <select name='classes' value={classes} onChange={(e) => onChange(e)}>
            <option name='ALL'>ALL</option>
            <option name='Lari1'>Lari1</option>
            <option name='Lari2'>Lari2</option>
            <option name='Larit 3'>Lari3</option>
            <option name='Lfsi 3'>Lfsi3</option>
          </select>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Document'
            name='document'
            value={document}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
