import { Component, OnInit } from '@angular/core';
import {GetAllService} from '../../services/get-all.service';
import {Customer} from '../../core/store/customer';
import {Subscription} from 'rxjs';
import {CustomersService} from '../../core/store/customers.service';
import {GetAll} from '../../DTO/getAll';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';

@Component({
  selector: 'app-radiology',
  templateUrl: './radiology.component.html',
  styleUrls: ['./radiology.component.css']
})
export class RadiologyComponent implements OnInit {
  customers: Customer;
  stateHistory = null;
  isHistoryVisible = false;
  id: any ;
  type: string;
  hero: GetAll[];
  loding = true;
  url: Object;
  subs = new Subscription();
  constructor(  private patientService: GetAllService,
                private customersService: CustomersService,
                private  _salamatservice: SalamatserviceService,
                private  i: ApiconfigserviceService
  ) {
    this.addCustomer();
    this.patientService.seturl(this.i.config.API_URL)

  }
  getAll(): void {

    this.patientService.getradio()
        .subscribe(res => {
          this.hero = res;
          this.loding = false;
        });
  }
  ngOnInit(): void {
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = state.customer;
      }
    }));
    this.getAll();
  }
  addCustomer() {
    const cust = {
      'id': 1,
      'state': '2',
       'res' : null
    };
    this.customersService.add(cust);
  }

}
