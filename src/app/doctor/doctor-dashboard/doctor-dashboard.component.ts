import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { PatientListServiceService} from './../../services/patient-list-service.service'
import { Observable, Subscription } from 'rxjs';
import {Customer} from '../../core/store/customer';
import {CustomersService} from '../../core/store/customers.service';
import {LocalStorageService} from '../../sevices/local-storage.service.service';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {timeout} from 'rxjs/operators';



@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})

export class DoctorDashboardComponent implements OnInit {
  private precdetail: any[];
   res: any;
   respars: any;
   img: any;
   url: any;
  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus()
    }
  }
  customers: Customer;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  dtOptions: DataTables.Settings = {};
  dateObject  = '';
  start = '';
  end = '';
  isviseted = '';
  dateObject1 = '';
  result: any [];
  resultcopy: any[];
  nationalCOde: any = '';
  encounterId: any;
  data = '';
  listdata: '';
  loading: boolean;
  tit: Observable<any>;
  val: '123';
  configdata: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private  _service: PatientListServiceService,
              private customersService: CustomersService,
              private localStorageService: LocalStorageService,
              private  _salamatservice: SalamatserviceService,
              private  i: ApiconfigserviceService
  ) {
    this.loading = false;
    this.url = i.config.API_URL;
    this._salamatservice.seturl(this.i.config.salamat_url);
    this._service.setMyGV(this.i.config.API_URL);
    this.addCustomer();
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/pages/login']);
    }
  }
  setrout(id) {
    this.getdata(id);
    this.router.navigate(['/DoctorDashboard/homePage/' + id]);
  }
   getdata(id) {
   this._service.getdetailpation(id).subscribe(p => {
      const cust = {
        'id': 1,
        'state': '1',
        'res': p
      };
      this.customersService.add(cust);
    });
  }
  onEnter(event: any) {
    const y = event;
    if (y != null) {
      this.result['outPatients'].forEach(o => {
        if (o['mainCode'] == y) {
          this.result = [];
          this.resultcopy = o;
        }
      })
    }
      // this._service.maincode_topation(y).subscribe( u => {
      //
      //   if (u['item'] != null) {
      //     this._service.postpationid(u['item']).subscribe(p => {
      //       this.result = p;
      //       alert(JSON.stringify(p));
      //       this.listdata = p['outPatients'];
      //       this.loading = false;
      //     })
      //   } else {
      //     setTimeout(() => {
      //       this._service.postpationid(y).subscribe(p => {
      //         this.result = p;
      //         this.listdata = p['outPatients'];
      //         this.loading = false;
      //       })
      //     }, 1000, this.loading = false)
      //   }
      // })


  }
  postDatestartdate(event: any) {
    this.start = event;
  }
  postDateenddate(event: any) {
    this.end = event;
  }
  postDate(event: any) {

    if (this.start === null || this.start == '' || this.start === undefined) {
      this.resultcopy = null;
      this.loading = true;
      this._service.getlistpation_inday().subscribe(res => {
        this.precdetail = res;
        this.result = res;
        this.listdata = res['outPatients'];
        this.loading = false;
      })
    } else {

      this.resultcopy = null;
      this.isviseted = event.target.chekvi.value;
      this.nationalCOde = event.target.nationalCode.value;
      this.loading = true;
      this._service.postPractitioner( this.start, this.end, this.isviseted, this.nationalCOde).subscribe(res => {
        this.result = res;
        this.precdetail = res;
        this.listdata = res['outPatients'];
        this.loading = false;


      })
    }

  }
  onSearchChange(event: any): void {
   const y = event.target.value;
   console.log(y);
   this.result['outPatients'].forEach(item => {
     if (y != '' && y === item.patient_NationalCode ) {
       this.result = [];
       this.resultcopy = item;
     }
   })

  }

  ngOnInit() {

    localStorage.removeItem('samadcode');
    localStorage.removeItem('salamatusertoken');
    localStorage.removeItem('citizentoken');
    localStorage.removeItem('encounterID');

    console.log('piiiii', this.i.config.drug_mode);
    this.localStorageService.removeItem('item')
    this._service.getsalamatseting().subscribe( p => {
      this.res = p['item']['setting_Json'];
      // p['item']['setting_Json'];
      this.respars = JSON.parse(this.res);
      localStorage.setItem('pass', this.respars.password);
      localStorage.setItem('user', this.respars.username);
    })
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = state.customer;
      }
    }));
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    localStorage.setItem('page', '1');

    this._service.getList().subscribe( res => {
      this.precdetail = res;
      localStorage.setItem('doc_id', this.precdetail['practitioner_ID']);
      this.result = res;

    });
  }
  addCustomer() {
    const cust = {
      'id': 1,
      'state': '0',
      'res': null
    };
    this.customersService.add(cust);
  }

    getdata_user_temp(id: any) {

    }
}
