from fastapi import APIRouter, Depends, HTTPException
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
def get_tasks(db: Session = Depends(get_db)):

    tasks = db.query(TaskModel).all()

    return tasks

# get task my task id
@router.get("/tasks/{task_id}")
def get_task(task_id: int, db: Session = Depends(get_db)):

    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if task is None:
        raise HTTPException(
    status_code=404,
    detail="Task not found"
)

    return task

# update an existing task
@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    updated_task: Task,
    db: Session = Depends(get_db)
):

    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if task is None:
        raise HTTPException(
    status_code=404,
    detail="Task not found"
)

    task.title = updated_task.title
    task.completed = updated_task.completed

    db.commit()

    db.refresh(task)

    return {
        "message": "Task updated successfully",
        "task": task
    }

# delete an existing task
@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()

    if task is None:
        raise HTTPException(
    status_code=404,
    detail="Task not found"
)

    db.delete(task)

    db.commit()

    return {
        "message": "Task deleted successfully"
    }

# create a task
@router.post("/tasks")
def create_task(task: Task, db: Session = Depends(get_db)):

    new_task = TaskModel(
        title=task.title,
        completed=task.completed
    )

    db.add(new_task)

    db.commit()

    db.refresh(new_task)

    return {
        "message": "Task created successfully",
        "task": new_task
    }