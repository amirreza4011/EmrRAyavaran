import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import  { OrderDocIDServiceService} from './../../services/order-doc-idservice.service';
import { IUser} from './../../DTO/iUser'
import {json} from 'ng2-validation/dist/json';
@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  id: any;
  hero: IUser;
  constructor(
      private route: ActivatedRoute,
        private userService: OrderDocIDServiceService
  ) { }
  getTest(): void {

    this.route.paramMap.subscribe(params => {
     this.id = params.get('orderDocID');
    });
   // alert(this.id);
    this.userService.getTest(this.id)
        .subscribe(res => this.hero = res[0]);

  }

  ngOnInit() {
    this.getTest();

  }

}
