import React, { useState, useEffect } from "react";
import NewsForm from "./NewsForm";
import Article from "./Article";
import { Button } from "@mui/material";
import axios from "axios";
 
const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
 
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/newsfeed/");
        console.log("Fetched articles:", response.data);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
 
    fetchArticles();
  }, []);
 
  const handleSave = async (article) => {
    if (isEditing) {
      try {
        await axios.put(
          `http://127.0.0.1:8000/newsfeed/${article.id}/`,
          article
        );
        setNews((prevNews) =>
          prevNews.map((item) => (item.id === article.id ? article : item))
        );
        setEditingArticle(null);
        setIsEditing(false);
        setShowForm(false);
      } catch (error) {
        console.log("Updating article with ID:", article.id);
      }
    } else {
      await handleCreate(article);
    }
  };
 
  const handleDelete = async (articleId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/newsfeed/${articleId}/`);
      setNews((prevNews) =>
        prevNews.filter((article) => article.id !== articleId)
      );
      if (editingArticle && editingArticle.id === articleId) {
        setEditingArticle(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
 
  const handleCreate = async (article) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/newsfeed/",
        article
      );
      setNews((prevNews) => [response.data, ...prevNews]);
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };
 
  const handleEdit = (articleId) => {
    const articleToEdit = news.find((article) => article.id === articleId);
    console.log("Editing article with ID:", articleId);
    console.log("Article to edit:", articleToEdit);
    setEditingArticle(articleToEdit);
    setIsEditing(true);
    setShowForm(true);
  };
 
  const handleCancel = () => {
    setIsEditing(false);
    setEditingArticle(null);
    setShowForm(false);
  };
 
  return (
    <div className="news-feed">
      <img
        src={require("./header2 image.png")}
        alt="Header"
        style={{ width: "98%", height: "auto", objectFit: "contain" }}
      />
      <div className="header-text-container">
        <h1>Nordic Automation App</h1>
        <p>
          Welcome to the Nordic Automat App! Here, you can easily suggest new
          processes for automation on our Submit Process page, keep an eye on
          your automated processes, and check out some interesting stats on the
          Dashboard page. <br />
          <br />
          Don't forget to interact with our helpful chatbot in the bottom right
          corner! It's always ready to lend a hand, whether you need to start an
          automation remotely, check on your submitted automation suggestions,
          or create a ticket to the Nordic Automation Support Group.
          <br />
          <br />
          Enjoy your time with the Nordic Automation App! <br />
          <br />
        </p>
        <h1>News Feed</h1>
      </div>
 
      {isLoggedIn && !showForm && (
        <Button
          onClick={() => setShowForm(true)}
          size="small"
          variant="contained"
          color="primary"
          style={{ marginLeft: "5px", marginTop: "10px" }}
        >
          Create
        </Button>
      )}
      {showForm && (
        <NewsForm
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={isEditing}
          editingArticle={editingArticle}
        />
      )}
      {news.map((article) => (
        <Article
          key={article.id}
          article={article}
          onEdit={isLoggedIn ? handleEdit : undefined}
          onDelete={isLoggedIn ? handleDelete : undefined}
        />
      ))}
    </div>
  );
};
 
export default NewsFeed;