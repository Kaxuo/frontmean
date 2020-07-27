import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import Task from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webService:WebRequestService) { }

  getLists(){
    return this.webService.get('lists')
  }

  getTasks(listId:string){
    return this.webService.get(`lists/${listId}/tasks`)
  }

  createList(title:string){
    // We want to send a web request to create a list => {title : title}
    return this.webService.post('lists',{ title })
  }

  updateList(id:string, title:string){
    // We want to send a web request to create a list => {title : title}
    return this.webService.patch(`lists/${id}`,{ title })
  }

  updateTask(listId:string, taskId:string, title:string){
    // We want to send a web request to create a list => {title : title}
    return this.webService.patch(`lists/${listId}/tasks/${taskId}`,{ title })
  }

  deleteList(id:string){
    return this.webService.delete(`lists/${id}`)
  }

  deleteTask(id:string,taskId:string){
    return this.webService.delete(`lists/${id}/tasks/${taskId}`)
  }
  createTask(title:string,listId:string){
    // We want to send a web request to create a list => {title : title}
    return this.webService.post(`lists/${listId}/tasks`,{ title })
  }

  complete(task:Task){
    // CHange it backend
    return this.webService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    })
  }
}
