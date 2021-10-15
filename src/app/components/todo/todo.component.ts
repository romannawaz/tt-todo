import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['title'];

  public form: FormGroup;

  public tasks: ITask[] | null = null;

  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.todoService.task$
        .subscribe(tasks => {
          this.tasks = tasks;
          console.log(this.tasks);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public addTask(form: HTMLFormElement): void {
    if (this.form.valid) {
      const newTask: ITask = this.form.value;

      this.todoService.addTask(newTask);

      form.reset();
    }
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
    })
  }

}
