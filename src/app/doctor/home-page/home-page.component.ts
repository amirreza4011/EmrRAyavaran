import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {of, Subscription} from 'rxjs';
import {CustomersService} from '../../core/store/customers.service';
import {PatientListServiceService} from '../../services/patient-list-service.service';
import { LocalStorageService } from '../../sevices/local-storage.service.service';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  encounterId = '';
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  pationdetail: any;
  result: any;
  customerobj: any;
  // tslint:disable-next-line:max-line-length
   resultmozmen: any;
   mozmenlist: Array<any> = [];
     salamaterror: any;
     resMessage4mth: any;
     issalamat:boolean;
  constructor(
          private  _salamatservice: SalamatserviceService,
          private localStorageService: LocalStorageService,
          private route: ActivatedRoute,
          private customersService: CustomersService,
          private  _service: PatientListServiceService,
          private  i: ApiconfigserviceService) {
    this._service.setMyGV(this.i.config.API_URL);
      this._salamatservice.seturl(this.i.config.salamat_url);
      this.route.paramMap.subscribe(params => {
      this.encounterId = params.get('id');
      if ( !localStorage.getItem('encounterID') ) {
          localStorage.setItem('encounterID', this.encounterId);
      }

    });

  }
  async  salamat_in() {
      if (localStorage.getItem('citizentoken') != null) {
          // tslint:disable-next-line:max-line-length
          await  this._salamatservice.getsamadcode(localStorage.getItem('salamattoken'), localStorage.getItem('salamatusertoken'), localStorage.getItem('citizentoken')).subscribe(o => {
              localStorage.setItem('samadcode', o['resMessage4mth'])
              this.salamaterror = o['resMessage'];
              this.resMessage4mth = o['resMessage4mth'];
          });
      } else {
          this.get_citizen_user();
      }

  }
 async  ngOnInit() {
      this.issalamat=this.i.config.salamt_api;
    this._salamatservice.getsalamtusertoken(localStorage.getItem('salamattoken')).subscribe( p => {
      localStorage.setItem('salamatusertoken', p['resMessage4mth']);
      this._salamatservice.getcitizentoken(localStorage.getItem('salamattoken'), p['resMessage4mth'], this.customerobj['patient_NationalCode']).subscribe(u => {
        localStorage.setItem('citizentoken', u['resMessage4mth']);
        this._salamatservice.getsamadcode(localStorage.getItem('salamattoken'), p['resMessage4mth'], u['resMessage4mth']).subscribe(o => {
          localStorage.setItem('samadcode', o['resMessage4mth'])
            this.salamaterror = JSON.parse(o['resMessage']);
          this.resMessage4mth = o['resMessage4mth'];
        });

      })
    });
     // this.getdata();
    const  g = await this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
        if (this.customerobj) {
          this._service.chronicdruglist(this.customerobj['patientID']).subscribe(p => {
            this.resultmozmen = p['items'];
            this.resultmozmen.forEach(e => {
              const content = {
                'id': e['id'],
                'res' : JSON.parse(e['jsonValue'])
              };
              this.mozmenlist.push(content);
            })
          });
        }

      }
    }));

  }

  get_citizen_user() {
      this._salamatservice.getsalamtusertoken(localStorage.getItem('salamattoken')).subscribe( p => {
          localStorage.setItem('salamatusertoken', p['resMessage4mth']);
          this._salamatservice.getcitizentoken(localStorage.getItem('salamattoken'), p['resMessage4mth'], this.customerobj['patient_NationalCode']).subscribe(u => {
              localStorage.setItem('citizentoken', u['resMessage4mth']);
              this._salamatservice.getsamadcode(localStorage.getItem('salamattoken'), p['resMessage4mth'], u['resMessage4mth']).subscribe(o => {
                  localStorage.setItem('samadcode', o['resMessage4mth'])
                  this.salamaterror = o['resMessage'];
                  this.resMessage4mth = o['resMessage4mth'];
              });

          })
      });
  }
 // async getdata() {
 //   const userAccess = await  this._service.getdetailpation(this.encounterId).subscribe(p => {
 //      const cust = {
 //        'id': 1,
 //        'state': '1',
 //        'res': p
 //      };
 //      this.customersService.add(cust);
 //    });
 //  }
  addCustomer() {
    const cust = {
      'id': 1,
      'state': '1',
      'patientID': this.result
    };
    this.customersService.add(cust);
  }

  delet_mozmen(id: any) {
    this._service.deletchronic(id).subscribe( p2 => {

            this._service.chronicdruglist(this.customerobj['patientID']).subscribe(p => {
                this.resultmozmen = p['items'];
                this.mozmenlist = [];
                this.resultmozmen.forEach(e => {
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
