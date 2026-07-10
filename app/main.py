from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from app.routers.tasks import router as task_router 
from fastapi.staticfiles import StaticFiles
from app.database import Base, engine
from app import models


app = FastAPI(title="Todo API",
    version="1.0.0"
            )
            
Base.metadata.create_all(bind=engine)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="app/templates")

app.include_router(task_router)

# home page
@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html"
        )

