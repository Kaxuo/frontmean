import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId:string

  constructor(private taskService:TaskService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        // now we get the list ID
        this.listId = params['listId']
      }
    )
  }

  createTask(title:string){
    this.taskService.createTask(title,this.listId).subscribe(newTask => {
      // go back previous but you need the parameters => Brought us back to the page 
      this.router.navigate(['../'], {relativeTo:this.route})
    })
  }

}
