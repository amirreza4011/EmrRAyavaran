import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { GetAllService} from './../../services/get-all.service';
import { GetAll} from './../../DTO/getAll';
import { ConfigurationService} from '../../services/Config/configuration.service'
import {Customer} from '../../core/store/customer';
import {CustomersService} from '../../core/store/customers.service';
import {Subscription} from 'rxjs';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';


@Component({
  selector: 'app-print-all',
  templateUrl: './print-all.component.html',
  styleUrls: ['./print-all.component.scss']
})
export class PrintAllComponent implements OnInit {
  customers: Customer;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();

  id: any ;
  type: string;
  hero: GetAll[];
  loding = true;
  url: Object;
  constructor(
      private route: ActivatedRoute,
      private patientService: GetAllService,
      private _config: ConfigurationService,
      private customersService: CustomersService,
      private  _salamatservice: SalamatserviceService,
      private  i: ApiconfigserviceService
  ) {
    this.addCustomer();
    this.patientService.seturl(this.i.config.API_URL)
  }
  getAll(): void {

    this.patientService.getAll()
        .subscribe(res => {
          this.hero = res;
          this.loding = false;
        });
  }


  ngOnInit() {
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = state.customer;
      }
    }));
    this.getAll();
    this.type = localStorage.getItem('type');
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



