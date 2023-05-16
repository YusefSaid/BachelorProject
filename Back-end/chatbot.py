from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from typing import Optional
from bmc import  create_ticket, fetch_ticket_status
from uipath import Orchestrator
 
 
 
 
app = FastAPI()
router = APIRouter()
 
class ChatbotRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    uid: Optional[str] = None
 
 
 
class ChatbotResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    ticketNumber: Optional[str] = None
    status: Optional[str] = None
 
 
 
@router.post("/create-ticket", response_model=ChatbotResponse)
async def create_ticket_endpoint(chatbot_request: ChatbotRequest) -> ChatbotResponse:
    title = chatbot_request.title
    description = chatbot_request.description
    uid = chatbot_request.uid
    print(f"title: {title}")
    print(f"description: {description}")
    print(f"uid: {uid}")
 
    code, ticket_number = create_ticket(title, description, uid)
 
    if code == 201:
        return ChatbotResponse(success=True, ticketNumber=ticket_number)
    else:
        return ChatbotResponse(success=False, message='Error while creating work order. The login username you entered is invalid')
 
 
 
@router.get("/check-ticket-status/{ticket_number}", response_model=ChatbotResponse)
async def check_ticket_status(ticket_number: str) -> ChatbotResponse:
    status = fetch_ticket_status(ticket_number)
 
    if status != "Ticket not found":
        return ChatbotResponse(success=True, status=status)
    else:
        return ChatbotResponse(success=False, message='Ticket not found or invalid ticket number')
 
app.include_router(router)
 