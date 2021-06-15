import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waitng-page',
  templateUrl: './waitng-page.component.html',
  styleUrls: ['./waitng-page.component.scss']
})
export class WaitngPageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
