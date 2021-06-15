import {Component, Input, OnInit} from '@angular/core';
import {PrescriptionServicesService} from '../../services/prescription-services.service';
import { Output, EventEmitter } from '@angular/core';
import {json} from 'ng2-validation/dist/json';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../sevices/local-storage.service.service';
import {CustomersService} from '../../core/store/customers.service';
import {Subscription} from 'rxjs';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
 @Output() public  childData = new EventEmitter();
    @Input() public  visibility = true;
     show = 1;
     title = 'jdhfjkf';
     list: any[];
     id1 = '';
     detail: '';
     defultdrugstore: '';
     listdrug: any[];
     conterdetailn: any;
    subs = new Subscription();
     customers: any;
     resdata: any;
     customerobj: any;
     config: string;
    url: any;
  constructor(
      private router: Router,
      private  _service: PrescriptionServicesService,
      private route: ActivatedRoute,
      private customersService: CustomersService,
      private  i: ApiconfigserviceService


  ) {
      this._service.setMyGV(this.i.config.API_URL);
      this.url = this.i.config.API_URL;
  }
  getID(value: string) {
        this.id1 = value;
    }
    newPres() {
      if (this.id1 === '') {
        alert('لطفا داروخانه را انتخاب کنید');
      } else {
        this.router.navigate(['/DoctorDashboard/NewPrescription/' + this.id1]);
      }

    }

  ngOnInit() {
      this.config = localStorage.getItem('conf');
      this.subs.add(this.customersService.stateChanged.subscribe(state => {
          if (state) {
              this.customers = JSON.stringify(state.customer['res']);
              this.customerobj = JSON.parse(this.customers);
          }
      }));
    this._service.getService().subscribe( res => {
      this.list = res;
        res.forEach(p => {
            if (p.iS_Default_Pharmacy === true) {
                this.id1 = p.id;
                this.defultdrugstore = p.name;
            }
        });
    });
  }

}
