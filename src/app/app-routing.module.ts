import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { WrongComponent } from './pages/wrong/wrong.component';

const routes: Routes = [
  // If you use redirectot then you need to add Pathmatch
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: 'new-list', component: NewListComponent },
  { path: 'edit-list/:id', component: EditListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'lists', component: TaskViewComponent },
  // If you have a dynamic router link, you need one without the parameters too
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent },
  { path: 'wrong', component: WrongComponent },
  { path: '**', component: TaskViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
