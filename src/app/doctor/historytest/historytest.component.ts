import { Component, OnInit } from '@angular/core';
import {EmrdrugserviceService} from '../../services/emr/emrdrugservice.service';
import {CustomersService} from '../../core/store/customers.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-historytest',
  templateUrl: './historytest.component.html',
  styleUrls: ['./historytest.component.css']
})
export class HistorytestComponent implements OnInit {
   customers: string;
   customerobj: any;
  subs = new Subscription();
  result:any;
  constructor(private  _service: EmrdrugserviceService,
              private customersService: CustomersService) { }

  ngOnInit(): void {
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
    this._service.getdetail(1).subscribe( p=>{
      this.result =p;
      console.log(p);
    });
  }

}
