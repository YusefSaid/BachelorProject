from fastapi import FastAPI
from pydantic import BaseModel
import databases
import sqlalchemy
from sqlalchemy import Table, Column, Integer, String, Date, MetaData
from datetime import date
from typing import Optional, List  
from fastapi import APIRouter
 
DATABASE_URL = "mysql+mysqlconnector://root:Root@127.0.0.1/newsfeed"
 
database = databases.Database(DATABASE_URL)
metadata = MetaData()
 
newsfeed = Table(
    "articles", 
    metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String(100)),
    Column("content", String(5000)),
    Column("author", String(100)),
    Column("tags", String(255)),
    Column("image", String(255)),  
    Column("avatar_img", String(255)),
    Column("date", Date),
)
 
engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)
 
app = FastAPI()
router = APIRouter()
 
 
 
class NewsArticle(BaseModel):
    id: Optional[int] = None
    title: str
    content: str
    author: str
    tags: str
    image: Optional[str] = None  
    avatar_img: Optional[str] = None
    date: date
 
 
@router.on_event("startup")
async def startup():
    await database.connect()
 
@router.on_event("shutdown")
async def shutdown():
    await database.disconnect()
 
@router.post("/newsfeed/", response_model=NewsArticle)
async def create_news_article(article: NewsArticle):
    article_data = article.dict()
    query = newsfeed.insert().values(**article_data)
    last_record_id = await database.execute(query)
    return {**article_data, "id": last_record_id}
 
 
@router.put("/newsfeed/{article_id}/", response_model=NewsArticle)
async def update_news_article(article_id: int, article: NewsArticle):
    query = newsfeed.update().where(newsfeed.c.id == article_id).values(**article.dict())
    await database.execute(query)
    return {**article.dict(), "id": article_id}
 
 
@router.delete("/newsfeed/{article_id}/")
async def delete_news_article(article_id: int):
    query = newsfeed.delete().where(newsfeed.c.id == article_id)
    await database.execute(query)
    return {"detail": f"Article with ID {article_id} deleted"}
 
 
@router.get("/newsfeed/", response_model=List[NewsArticle])
async def read_news_articles():
    query = newsfeed.select()
    rows = await database.fetch_all(query)
    articles = [NewsArticle(**row) for row in rows]
    return articles
 
app.include_router(router)