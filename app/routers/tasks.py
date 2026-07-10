from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Task as TaskModel
from app.schemas import Task

router = APIRouter()

todo = []

@router.get("/about")
def about():
    return {"version 1.0"}

# get all tasks
@router.get("/tasks")
def get_tasks():
    return todo

# get task my task id
@router.get("/tasks/{task_id}")
def get_task(task_id:int):
    if task_id < len(todo):
        return todo[task_id]
    else:
        return {"error":"task not found"}

# update an existing task
@router.put("/tasks/{task_id}")
def update_task(task_id:int, updated_task: Task):
    if task_id < len(todo):
        todo[task_id] = updated_task
        return {"message": "Task updated"}
    else:
        return {"error": "Task not found"}

# delete an existing task
@router.delete("/tasks/{task_id}")
def delete_task(task_id:int):
    if task_id < len(todo):
        deleted_task = todo.pop(task_id)
        return {"message":"task deleted successfully",
        "task": deleted_task}
    else:
        return {"error":"task not found"}

# create a task
@router.post("/tasks")
def create_task(task: Task):
    todo.append(task)
    return {"message":"task created successfully",
            "task": task
            }