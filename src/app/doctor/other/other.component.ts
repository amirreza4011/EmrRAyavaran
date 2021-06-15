import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LabReqService} from '../../services/labratoryRequest/lab-req.service';
import {CustomersService} from '../../core/store/customers.service';
import {Router} from '@angular/router';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {
   mess: any;
  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus()
    }
  }
  labform: FormGroup;
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  testName = '';
  myControl = new FormControl();
  serchlist = new Array();
  listdrug: any[];
  name: any = [];
  value = '';
  show: boolean;
  datafinal:  Array<any> = [];
  listserves: [];
  historylab: any;
  testnameList = '';
  result: any;
  result1: any;
  detail: any;
  loading: boolean;
  private customerobj: any;
  private labfav:  Array<any> = [];
  constructor(
      private modalService: NgbModal,
      private _labReq: LabReqService,
      private customersService: CustomersService,
      private router: Router,
      private fb: FormBuilder,
      private  _salamatservice: SalamatserviceService,
      private  i: ApiconfigserviceService
  ) {
    this._labReq.seturl(this.i.config.API_URL)
    this.loading = false;
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/pages/login']);
    }
  }
  GetDetails(content) {

    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
    }, (reason) => {
    });
    this._labReq.getlabfav().subscribe(p => {
      this.result1 = p['items'];
      this.labfav=[];
      this.result1.forEach(e => {
        const content1 = {
          'id': e['id'],
          'res' : JSON.parse(e['jsonValue'])
        };
        this.labfav.push(content1);
      })
    });
  }
  obshow() {
    this.show = true;
  }
  obhide() {
    this.show = false;
  }

  async ngOnInit() {
    document.getElementById('test').focus();
    this.labform = this.fb.group({
      'labname': ['', Validators.required ],
    })
    await  this._labReq.getlistitem('4').subscribe(res => {
      this.listdrug = res;

    });
    this.serchlist = null;
    this.show = false;
    this._labReq.servicename().subscribe(res => {
          this.listserves = res;
          console.log(res);
        }
    );
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
  }
  onSearchChange(event: any) {
    const key = event.target.value;
    this.name = key;
    this.serchlist = [];
    this.listdrug['items'].forEach(item => {

      if (key === '') {
        this.serchlist = [];
      }
      if (key != '' ) {
        const f =  item.name.toLowerCase().substring(0, key.length);
        if (key === f) {
          this.serchlist.push(item)

        } else {
          const f =  item.masterService_NationalCode.toLowerCase().substring(0, key.length);
          if (key === f) {
            this.serchlist.push(item)
          }
        }
      }
    });


  }


  set(d: any) {
    let chek = false;
    this.datafinal.forEach( p => {
      if (p['name'] === d['name']) {
        chek = true;
      }
    })
    if (chek) {
      alert('خدمت انتخاب شده در لیست وجود دارد');
    } else {
      // tslint:disable-next-line:max-line-length
      this._salamatservice.getdetailtest(localStorage.getItem('salamattoken'), localStorage.getItem('salamatusertoken'), localStorage.getItem('citizentoken'), localStorage.getItem('samadcode'), d['masterService_NationalCode']).subscribe(p => {
        this.mess = p;
      });
      const  data = {
        'masterServiceID': d['masterServiceID'],
        'orderTemplateID': d['orderTemplateID'],
        'qty': '1',
        'priorityIX': '0',
        'name': d['name'],
      };
      this.datafinal.push(data);
      this.labform.reset();
      this.serchlist = null;
      document.getElementById('test').focus();
      chek = false;
    }


  }
  save() {
    if (this.datafinal.length > 0) {
      this.loading = true;
      this._labReq.insertlab(this.datafinal, this.customerobj['currentEncounterLocationID'],'4').subscribe(p => {
        this.result = p;
        this.loading = false;
        this.datafinal = [];
        this.value = '';

      });
    } else {
      alert('هیچ خدمتی برای ارسال انتخاب نشده است');
    }

  }
  Get_Last_History_Of_Observation(name: any) {
    this.detail = JSON.parse(localStorage.getItem('detailenconter'));
    this.datafinal.forEach(p => {
      if (p['name'] === name) {
        this._labReq.gethistorylab(this.customerobj['patientID'], p['masterServiceID']).subscribe(res => {
          this.historylab = res;
        })
      }
    })
  }
  change(event: any ) {
    alert(event)
    this._labReq.getlistitem('0').subscribe(res => {
      this.listdrug = res;
      console.log(res)
    });

  }
  onSubmit() {

  }
  deleteItem(i) {
    this.datafinal.splice(i, 1)
  }

  favLIst(i: any) {
    this._labReq.favariteList(i).subscribe(res => {
      alert('آزمایش به لیست پرکاربرد اضافه شد');
    })
  }

  async deletmozmen(id: any) {
    await this._labReq.deletfavlab(id).subscribe(p=>{
      this._labReq.getlabfav().subscribe(p => {
        this.result1 = p['items'];
        this.labfav = [];
        this.result1.forEach(e => {
          const content1 = {
            'id': e['id'],
            'res' : JSON.parse(e['jsonValue'])
          };
          this.labfav.push(content1);
        })
      });
    })
  }

  setfav(i: any) {
    const chek = false;
    if (this.datafinal.length > 0) {
      this.datafinal.forEach( p => {
        if (i['name'] == p['name']) {
          alert('درخواست قبلا انتخاب شده است');
        } else {
          this.datafinal.push(i);
        }
      })
    } else {
      this.datafinal.push(i);
    }

  }

}
