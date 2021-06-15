import { Component, OnInit } from '@angular/core';
import {EmrdrugserviceService} from '../../services/emr/emrdrugservice.service';
import {CustomersService} from '../../core/store/customers.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-historyobservation',
  templateUrl: './historyobservation.component.html',
  styleUrls: ['./historyobservation.component.css']
})
export class HistoryobservationComponent implements OnInit {
  listhistory: any;
  customers: string;
  subs = new Subscription();
  customerobj: any[];
  listhistoryitem: any[];
  constructor(
              private  _service: EmrdrugserviceService,
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

    this.listhistory = this._service.observation_get( this.customerobj['patientID']).subscribe( p => {
      this.listhistory = p;
    })
  }

}
