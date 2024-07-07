from pathlib import Path

from fastapi import FastAPI, Form, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

app = FastAPI()

# Mount static files
app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).parent.parent.absolute() / "static"),
    name="static",
)

# Set up templates
templates = Jinja2Templates(
    directory=Path(__file__).parent.parent.absolute() / "templates"
)


class SurveyData(BaseModel):
    name: str
    email: str
    age: int
    feedback: str


@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/submit-survey")
async def submit_survey(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    age: int = Form(...),
    feedback: str = Form(...),
):
    survey_data = SurveyData(name=name, email=email, age=age, feedback=feedback)
    # Process the survey data here (e.g., save to database)
    print(survey_data)
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "message": "Survey submitted successfully",
            "data": survey_data,
        },
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
