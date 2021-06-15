import { Component, OnInit } from '@angular/core';
import {Customer} from '../../core/store/customer';
import {GetAll} from '../../DTO/getAll';
import {Subscription} from 'rxjs';
import {GetAllService} from '../../services/get-all.service';
import {CustomersService} from '../../core/store/customers.service';
import {PatientListServiceService} from '../../services/patient-list-service.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';

@Component({
  selector: 'app-medicaions',
  templateUrl: './medicaions.component.html',
  styleUrls: ['./medicaions.component.scss']
})
export class MedicaionsComponent implements OnInit {
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  result: any;
  conterdetail: '';
  mozmenlist:  Array<any> = [];
  config: any;
    private customerobj: any;
  constructor(
                private customersService: CustomersService,
                private  _service: PatientListServiceService,
                private  i: ApiconfigserviceService

  ) {
      this._service.setMyGV(this.i.config.API_URL);
  }

  ngOnInit() {
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
          this.customers = JSON.stringify(state.customer['res']);
          this.customerobj = JSON.parse(this.customers);
      }
    }));
    this._service.chronicdruglist(this.customerobj['patientID']).subscribe(p => {
      this.result = p['items'];
      this.result.forEach(e => {
         const content = {
             'id': e['id'],
              'res' : JSON.parse(e['jsonValue'])
         };
         this.mozmenlist.push(content);
      })
    });
  }

  async  deletmozmen(id: any) {
   await  this._service.deletchronic(id).subscribe(p => {
           this._service.chronicdruglist(this.customerobj['patientID']).subscribe(p => {
              this.result = p['items'];
              this.mozmenlist = [];
              this.result.forEach(e => {
                  const content = {
                      'id': e['id'],
                      'res' : JSON.parse(e['jsonValue'])
                  };
                  this.mozmenlist.push(content);
              })
          });
      })
    }
}
