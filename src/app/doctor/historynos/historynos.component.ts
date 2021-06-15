import { Component, OnInit } from '@angular/core';
import {EmrdrugserviceService} from '../../services/emr/emrdrugservice.service';
import {CustomersService} from '../../core/store/customers.service';
import {Customer} from '../../core/store/customer';
import {Subscription} from 'rxjs';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';

@Component({
  selector: 'app-historynos',
  templateUrl: './historynos.component.html',
  styleUrls: ['./historynos.component.css']
})
export class HistorynosComponent implements OnInit {
  listhistory: any;
  customers: string;
  subs = new Subscription();
   customerobj: any[];
   listhistoryitem: any[];
  constructor(private  _service: EmrdrugserviceService,
              private customersService: CustomersService,
              private  i: ApiconfigserviceService

  ) {        this._service.seturl(this.i.config.API_URL);
  }

  ngOnInit(): void {
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
    this._service.getgrughistory(this.customerobj['patientID']).subscribe( p => {
      this.listhistory = p;
    })
  }

  detail(id: any) {
   this._service.getdetail(id).subscribe( p => {
     this.listhistoryitem = p;
   })
  }
}
