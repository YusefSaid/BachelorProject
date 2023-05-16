from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
 
DATABASE_URL = "mysql+mysqlconnector://root:Root@127.0.0.1/Forms"
 
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
 
def init_db():
    Base.metadata.create_all(bind=engine)