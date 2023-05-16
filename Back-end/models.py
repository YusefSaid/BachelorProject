from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from datetime import datetime
 
Base = declarative_base()
 
class Process(Base):
    __tablename__ = 'process'
    id = Column(Integer, primary_key=True)
    processName = Column(String)
    processCategory = Column(String)
    processDescription = Column(String)
    processDocumentation = Column(Boolean)
    processDuration = Column(String)
    processFrequency = Column(String)
    processEmail = Column(String)
    date = Column(DateTime, default=datetime.utcnow)
    processmarks = relationship("ProcessMarks", uselist=False, back_populates="process")
 
class ProcessMarks(Base):
    __tablename__ = 'processmarks'
    id = Column(Integer, primary_key=True)
    process_id = Column(Integer, ForeignKey('process.id'))
    processRuleMarks = Column(Integer)
    processStructureMarks = Column(Integer)
    processStabilityMarks = Column(Integer)
    process = relationship("Process", back_populates="processmarks")
 
class ProcessBase(BaseModel):
    processName: str
    processCategory: str
    processDescription: str
    processDocumentation: bool
    processDuration: str
    processFrequency: str
    processEmail: str
 
class ProcessMarksBase(BaseModel):
    processRuleMarks: int
    processStructureMarks: int
    processStabilityMarks: int
    process_id: int