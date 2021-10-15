import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly _tasks: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);

  readonly task$: Observable<ITask[]> = this._tasks.asObservable();

  public get tasks() {
    return this._tasks.getValue();
  }

  private set tasks(tasks: ITask[]) {
    this._tasks.next(tasks);
  }

  public addTask(task: ITask): void {
    this.tasks = [
      ...this.tasks,
      task
    ];
  }
}
