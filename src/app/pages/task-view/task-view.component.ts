import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { TaskService } from '../../services/task.service';
import List from '../../models/list';
import Task from '../../models/task';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];
  selectedListId:string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) {}

  // Route Params allows us to get the value of the route /abc ==> params = abc  => params would equal to listID (check app routing module)
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // Iif there is a listId
      if (params.listId) {
        this.selectedListId = params.listId
        console.log(params);
        // listId has to match what's called in routing module
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });
      } else {
        this.tasks = undefined
      }
    });
    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });

    if (!localStorage.getItem("x-access-token")){
      this.router.navigate(['/login']);
    }
  }

  onTaskClick(task: Task) {
    // We want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // Task has been completed successfully , change it for the FRONT END
      task.completed = !task.completed;
    });
  }

  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe((res:any) => {
      console.log(res)
      this.router.navigate(['./lists'])
    })
  }

  onTaskDeleteClick(id:string){
    this.taskService.deleteTask(this.selectedListId,id).subscribe((res:any) => {
      // Front End
      this.tasks = this.tasks.filter(val =>val._id !== id)
      console.log(res)
    })
  }

  logout(){
    this.authService.logout()
  }
}
