from fastapi import FastAPI, Depends, HTTPException, status, Security

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import Optional
import jwt
import datetime
from passlib.context import CryptContext
from fastapi import APIRouter
 
 
DATABASE_URL = "mysql+mysqlconnector://root:Root@127.0.0.1/login"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
 
 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
 
 
class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    firstname = Column(String)
    lastname = Column(String)
 
 
Base.metadata.create_all(bind=engine)
 
 
class AdminCreate(BaseModel):
    username: str
    password: str
    firstname: str
    lastname: str
 
 
class AdminOut(BaseModel):
    id: int
    username: str
    password: str
    firstname: str
    lastname: str
 
    class Config:
        orm_mode = True
 
 
def create_admin(db: Session, admin: Admin):
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin
 
 
def get_admin_by_username(db: Session, username: str):
    return db.query(Admin).filter(Admin.username == username).first()
 
 
 
SECRET_KEY = "Nordic"  
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
 
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
 
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
 
 
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
 
 
def get_password_hash(password):
    return pwd_context.hash(password)
 
 
def authenticate_admin(db: Session, username: str, password: str):
    admin = get_admin_by_username(db, username)
    print("admin: ", admin)
    if not admin:
        return False
    if not verify_password(password, admin.password):
        return False
    return admin
 
 
 
 
def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
 
 
class Token(BaseModel):
    access_token: str
    token_type: str
 
app = FastAPI()
router = APIRouter()
 
 
@router.post("/admins/", response_model=AdminOut)
def create_admin_endpoint(admin: AdminCreate, db: Session = Depends(get_db)):
    db_admin = get_admin_by_username(db, username=admin.username)
    if db_admin:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = get_password_hash(admin.password)
    created_admin = create_admin(
        db=db, admin=Admin(password=hashed_password, **admin.dict(exclude={"password"}))
    )
    print(f"Admin created: {created_admin.firstname} {created_admin.lastname} (ID: {created_admin.id})")
    return created_admin
 
 
@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    admin = authenticate_admin(db, form_data.username, form_data.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
 
 
 
 
 
 
app.include_router(router)