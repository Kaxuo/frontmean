import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import List from 'src/app/models/list';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent implements OnInit {
  listId: string;
  lists:List[]

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.id;
        console.log(params);
      }
    )
    const bob = this.taskService.getLists().pipe(
      map((element:Array<any>)=> {
        return element.map(element => element._id)
      })
    ).subscribe(element => {
      if (!element.includes(this.listId)){
        this.router.navigate(['/lists', this.listId]);
      }
    });
  }

  updateList(title) {
    this.taskService.updateList(this.listId, title).subscribe((res: any) => {
      this.router.navigate(['/lists', this.listId]);
    });
  }
}
