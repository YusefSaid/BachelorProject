import React from 'react';
import './News-feed.css'; 
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TryIcon from '@mui/icons-material/Try';
import { Button } from '@mui/material';
 
 
 
const Article = ({ article, onEdit, onDelete }) => {
 
  const { title, content, author, tags, image, date, avatar_img } = article;
 
  const renderTags = (tags) => {
    const tagArray = tags.split(";");
 
    return (
      <Stack direction="row" spacing={1} style={{ paddingLeft: "7px" }}>
        {tagArray.map((tag) => (
          <Chip key={tag} label={tag} size="small" />
        ))}
      </Stack>
    );
  };
 
  return (
    <div className="article">
      <div className="article-meta">
        {avatar_img && (
          <Avatar style={{ width: 24, height: 24, objectFit: 'cover', backgroundColor: '#303841' }}>
            <img src={avatar_img} style={{ width: '100%', height: '100%' }} />
          </Avatar>
        )}
 
        <span>{author}</span>
        <span>-</span>
        <span>{date}</span>
        <span>-</span>
        <TryIcon color="primary" fontSize="small" />
      </div>
 
      <h2>{title}</h2>
 
      <div className={`text-container ${!image && "no-image"}`}>
      <div className="paragraph" dangerouslySetInnerHTML={{ __html: content }} />
 
 
        {image && (
          <img src={image} alt={title} />
        )}
      </div>
 
      <div className="article-tags-buttons" style={{ display: 'flex', alignItems: 'center' }}>
        {renderTags(tags)}
 
        <div className="article-buttons" style={{ marginLeft: 'auto' }}>
  {onEdit && (
    <Button
      onClick={() => onEdit(article.id)}
      size="small"
      variant="contained"
      color="primary"
      style={{ marginLeft: '5px' }}
    >
      Edit
    </Button>
  )}
  {onDelete && (
    <Button
      onClick={() => onDelete(article.id)}
      size="small"
      variant="contained"
      color="primary"
      style={{ marginLeft: '5px' }}
    >
      Delete
    </Button>
  )}
</div>
 
      </div>
    </div>
  );
 
 
};
 
export default Article;