import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-wrong',
  templateUrl: './wrong.component.html',
  styleUrls: ['./wrong.component.scss']
})
export class WrongComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  onCLick(){
    this._location.back()
  }

}
