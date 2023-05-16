from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models import ProcessBase, ProcessMarks, Process
from bmc import create_ticket
from db import SessionLocal
from chatbot import router as chatbot_router  
from login import router as login_router  
from newsfeed import router as newsfeed_router
import uvicorn
from fastapi.exceptions import RequestValidationError
from fastapi import FastAPI, Request, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi import status
 
app = FastAPI()
 
origins = [
    "http://localhost:3000",
    "http://10.24.167.165:3000",
 
]
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(chatbot_router)
app.include_router(login_router)  
app.include_router(newsfeed_router)
@app.post("/process")
async def newProcess(process: Request):
 
    addprocess = await process.json()
 
    print(addprocess)
 
    if 'values' in addprocess.keys():
 
        process = Process(processName=addprocess['values']["processName"],
                          processCategory=addprocess['values']["processCategory"],
                          processDescription=addprocess['values']["processDescription"],
                          processDuration=addprocess['values']["processDuration"],
                          processDocumentation=addprocess['values']["processDocumentation"],
                          processFrequency=addprocess['values']["processFrequency"],
                          processEmail=addprocess['values']["processEmail"])
 
        session = SessionLocal()
        session.add(process)
        session.commit()
 
        new_id = process.id
 
        processmarks = ProcessMarks(
            processRuleMarks=addprocess['values']["processRuleMarks"],
            processStructureMarks=addprocess['values']["processStructureMarks"],
            processStabilityMarks=addprocess['values']["processStabilityMarks"],
            process_id=new_id)
        session.add(processmarks)
        session.commit()
 
        session.close()
 
    else:
 
        process = Process(processName=addprocess["processName"],
                          processCategory=addprocess["processCategory"],
                          processDescription=addprocess["processDescription"],
                          processFrequency=addprocess["processFrequency"],
                          processDuration=addprocess["processDuration"],
                          processDocumentation=addprocess["processDocumentation"],
                          processEmail=addprocess["processEmail"])
 
        session = SessionLocal()
        session.add(process)
        session.commit()
 
        new_id = process.id
 
        processmarks = ProcessMarks(
            processRuleMarks=addprocess["processRuleMarks"],
            processStructureMarks=addprocess["processStructureMarks"],
            processStabilityMarks=addprocess["processStabilityMarks"],
            process_id=new_id)
        session.add(processmarks)
        session.commit()
 
        session.close()
 
 
    return {"message": "Process created successfully!"}
 
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )
 
 
 
@app.post("/submit-form")
async def submit_form(form_data: ProcessBase):
    # Process form data
    process_name = form_data.processName
    process_description = form_data.processDescription
    process_category = form_data.processCategory
    process_duration = form_data.processDuration
    process_documentation = form_data.processDocumentation
    process_frequency = form_data.processFrequency
    process_email = form_data.processEmail
 
    # Call the create_ticket function
    title = f"New Automation Proposal: {process_name}"
    description = f"""Description: {process_description}
Category: {process_category}
Duration: {process_duration}
Documentation: {process_documentation}
Frequency: {process_frequency}
Email: {process_email}"""
 
    try:
        create_ticket(title=title, description=description, uid="uif96750")
        return JSONResponse(content={"status": "success"})
    except Exception as e:
 
        raise HTTPException(status_code=500, detail=str(e))
 
 
 
 
 
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1",
                port=8000, reload=True)
 