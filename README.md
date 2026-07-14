# 📝 FastAPI Todo App

My first FastAPI project built while learning backend development.

This project is a simple Todo application with a FastAPI backend, SQLite database, SQLAlchemy ORM, and a basic HTML/CSS/JavaScript frontend.

---

## 🚀 Features

- Add a new task
- View all tasks
- Update a task
- Mark task as complete/incomplete
- Delete a task
- SQLite database
- REST API using FastAPI
- Interactive API documentation (Swagger UI)

---

## 🛠 Tech Stack

- Python 3
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Jinja2
- HTML
- CSS
- JavaScript
- Uvicorn

---

## 📂 Project Structure

```text
todo-api/
│
├── app/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── routers/
│   │   └── tasks.py
│   ├── static/
│   │   ├── style.css
│   │   └── script.js
│   └── templates/
│       └── index.html
│
├── tasks.db
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project:

```bash
cd todo-api
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it

Linux/macOS:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application:

```bash
python -m uvicorn app.main:app --reload
```

Open:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Home page |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/{id}` | Get task by ID |
| POST | `/tasks` | Create task |
| PUT | `/tasks/{id}` | Update task |
| DELETE | `/tasks/{id}` | Delete task |

---

## 📷 Screenshots

You can add screenshots here after uploading them.

Example:

```
screenshots/home.png
screenshots/swagger.png
```

---

## 📚 What I Learned

During this project I learned:

- FastAPI fundamentals
- REST API development
- CRUD operations
- SQLAlchemy ORM
- SQLite database integration
- Pydantic models
- APIRouter
- HTML templates using Jinja2
- JavaScript Fetch API
- Git and GitHub workflow

---

## 🌟 Future Improvements

- Search tasks
- Task categories
- Due dates
- User authentication
- Docker support
- Deployment on Render

---

## 👩‍💻 Author

**Nafisha Parween**

This is my first FastAPI project as part of my backend development learning journey.