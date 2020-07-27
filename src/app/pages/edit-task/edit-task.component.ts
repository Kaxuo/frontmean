import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  listId: string;
  taskId:string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.listId;
        this.taskId = params.taskId
        console.log(params);
      }
    )
  }

  updateTask(title) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe((res: any) => {
      this.router.navigate(['/lists', this.listId]);
    });
  }
}
