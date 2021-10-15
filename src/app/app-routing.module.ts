import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { TodoComponent } from './components/todo/todo.component';
import { UserGuard } from './shared/guards/user.guard';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'todo', component: TodoComponent, canActivate: [UserGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
