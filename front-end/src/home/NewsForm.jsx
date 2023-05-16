import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles


const NewsForm = ({
  onSave,
  onCancel,
  isEditing,
  editingArticle,
}) => {
  const getInitialState = () => ({
    title: '',
    content: '',
    author: '',
    tags: '',
    image: '',
  });

  useEffect(() => {
    setLocalArticle(editingArticle || getInitialState());
  }, [editingArticle]);

  

  const [localArticle, setLocalArticle] = useState(editingArticle || getInitialState());

  const mode = isEditing ? 'edit' : 'create';

  const handleSubmit = (e) => {
    e.preventDefault();
    const avatar_img =
      localArticle.author === "Yusef Said"
        ? require("./Kanot3.jpg")
        : require("./Kanot3.jpg");
  
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
    if (mode === 'create') {
      const newArticle = {
        ...localArticle,
        avatar_img,
        date,
      };
      onSave(newArticle);
    } else {
      const updatedArticle = {
        ...localArticle,
        avatar_img,
        date,
      };
      onSave(updatedArticle);
    }
  
    onCancel(); // Hide the form after saving
    setLocalArticle(getInitialState()); // Clear the form fields
  };
  
  


  return (
    <form onSubmit={handleSubmit} className="news-form">
      <TextField
        label="Title"
        value={localArticle.title}
        onChange={(e) => setLocalArticle({ ...localArticle, title: e.target.value })}
        fullWidth
        margin="normal"
      />
      <ReactQuill
  theme="snow"
  value={localArticle.content}
  onChange={(content) => setLocalArticle({ ...localArticle, content })}
  modules={NewsForm.modules}
  formats={NewsForm.formats}
  placeholder="Content"
  style={{ marginBottom: "10px" }}
/>

      <FormControl fullWidth margin="normal">
        <InputLabel id="author-select-label">Author</InputLabel>
        <Select
          labelId="author-select-label"
          value={localArticle.author}
          onChange={(e) => setLocalArticle({ ...localArticle, author: e.target.value })}
          label="Author"
        >
          <MenuItem value="Yusef Said">Yusef Said</MenuItem>
          <MenuItem value="Daniel Fyhn">Daniel Fyhn</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Tags (Separate by semicolon ';')"
        value={localArticle.tags}
        onChange={(e) => setLocalArticle({ ...localArticle, tags: e.target.value })}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        className="btn btn-edit"
        size="small"
        variant="contained"
        color="primary"
        style={{ marginLeft: '5px', marginTop: '10px' }}
      >
        {mode === 'edit' ? 'Save' : 'Create'}
      </Button>
      <Button
  onClick={() => {
    onCancel();
    setLocalArticle(getInitialState()); // Clear the form fields
  }}
  className="btn btn-cancel"
  size="small"
  variant="contained" // Change this from "outlined" to "contained"
  color="primary" 
  style={{ marginLeft: '5px', marginTop: '10px' }}
>
  Cancel
</Button>

     
      
      
    </form>
  );
};

NewsForm.modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };
  
  NewsForm.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];
  

export default NewsForm;
