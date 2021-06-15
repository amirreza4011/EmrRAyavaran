import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-drug-order',
  templateUrl: './drug-order.component.html',
  styleUrls: ['./drug-order.component.scss']
})
export class DrugOrderComponent implements OnInit {
  encounterId: any;
  constructor(
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {


  }


}
