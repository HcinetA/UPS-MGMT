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
            placeholder='Document'
            name='document'
            value={document}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Veuillez uploader n'importe quel document sur Google Drive, puis
            insérer le lien du fichier ici !
          </small>
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
