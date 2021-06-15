import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PrescriptionServicesService} from '../../services/prescription-services.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Customer} from '../../core/store/customer';
import {Subscription} from 'rxjs';
import {CustomersService} from '../../core/store/customers.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {ProfileseviceService} from '../../services/profilesevice.service';
import {PatientListServiceService} from '../../services/patient-list-service.service';

@Component({
  selector: 'app-new-prescription',
  templateUrl: './new-prescription.component.html',
  styleUrls: ['./new-prescription.component.scss']
})
export class NewPrescriptionComponent implements OnInit {
    printValid = false
   generic: any;
   historydrougenconter: any;
   listdrugerx: any;
   status: any;
   favdrug: any;
   testd: any;
   resedit: any;
   encounterId: string;
   defultdrugstore: any;
   liststore: any;
   resultmozmen: any;
   chek_brand: Boolean;
     error_m: any;
     trakingcode: any;
     alarm: any[];
     re: any;
  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus()
    }
  }
  signupForm: FormGroup;
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  list1: any;
  termin_saleble_id: any;
  pharmacy = '';
  listdrug: any[];
  term: '';
  serchlist = new Array();
  value = '';
  favprescription = new Array();
  addtempdrug = new Array();
  Frequency = '';
  Dispense = '';
  Dose = '';
  id1 = '';
  qualifier = '';
  Administration = '';
  Duration = '';
  Direction = '';
  myControl = new FormControl();
  DAW: boolean;
  doseText = '';
  DurationText = '';
  dispenseText = '';
  route1 = '';
  listItem: any;
  listforsend: any;
  myform: any;
  title = '';
  favariteList: [];
  json = '';
  fava: any;
  show = 'none';
  detail = '';
  paclist: [];
  frequncyid: '';
  ressenddata = 'no';
  load = false;
  datafinal:  Array<any> = [];
  cheklist:  Array<any> = [];
  datasepas:  Array<any> = [];
  favlist:  Array<any> = [];
  conterdetail: any;
  title1 = 'jkhasjk';
  listroute: [];
    ischek = false;
  editrecord: any;
   disid: any;
   drugid: any;
   customerobj: any;
   listfrequncy: any;
   config: any;
   messg: any;
   drug_mode: any;
  erX_Code: any;
   itemtemp: Array<any> = [];
  favtemplist:  Array<any> = [];
  checked: any;
   url: any;
   mozmenlist:  Array<any> = [];

   messgshow: boolean;
    messag: any;
    typemodal: number;
    issalamat: boolean;
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private  _service: PrescriptionServicesService,
      private modalService: NgbModal,
      private customersService: CustomersService,
      private fb: FormBuilder,
      private element: ElementRef<HTMLInputElement>,
      private  _salamatservice: SalamatserviceService,
      private  i: ApiconfigserviceService,
      private _ser: ProfileseviceService,
      private  _servicemozmen: PatientListServiceService,
) {
    this._service.setMyGV(this.i.config.API_URL);
    if (this.i.config.drug_mode == 'E') {
        this.termin_saleble_id = 7;
    } else {
        this.termin_saleble_id = 6;
    }
    this._ser.seturl(this.i.config.API_URL);
      this.issalamat = this.i.config.salamt_api;
    this.url = this.i.config.API_URL;
    this._servicemozmen.setMyGV(this.i.config.API_URL);
    this._salamatservice.seturl(this.i.config.salamat_url);
    this.route.paramMap.subscribe(params => {
      this.pharmacy = params.get('');

    });
      this.drug_mode = this.i.config.drug_mode;
      this.chek_brand = true;
      this._service.set_sepas(this.i.config.sepas_url);
    // this._servicemozmen.getdetailpation(this.encounterId).subscribe(p => {
    //   const cust = {
    //     'id': 1,
    //     'state': '1',
    //     'res': p
    //   };
    //   this.customersService.add(cust);
    // });


    this._service.getpac().subscribe(p => {
      this.paclist = p;
    });
  }

  ngOnInit() {

      this.cheklist = [];
      this.typemodal = 1;
    this.messgshow = false;
    this._service.getService().subscribe( res => {
      this.liststore = res;
      res.forEach(p => {
        if (p.iS_Default_Pharmacy === true) {
          this.id1 = p.id;
          this.defultdrugstore = p.name;
        }

      });
      this._service.getdruglist(this.id1).subscribe( res => {
        this.listdrug = res;

      })

    });

    this._ser.gae_fav(2).subscribe( h => {
      this.favdrug = h['items'];
      console.log(h);
    })
    this._service.getlistdrug(localStorage.getItem('encounterID')).subscribe( h => {
      this.resedit = h['items'][0];
      this.status = h['items'] ? h['items'][0]['rayavaran_WardRequest_Status_Code'] : '';
      h['items'].forEach( l => {
        this.historydrougenconter = JSON.parse(l['jsonValue'])
       const g = JSON.parse(l['jsonValue']);

        g.forEach( k => {
          this.listItem.push(k)

        })
      })
    });

    this._service.getFavList().subscribe( res => {
      this.favariteList = res['items'];
      this.favariteList.forEach(p => {
        const content1 = {
          'id': p['id'],
          'res': JSON.parse(p['jsonValue'])
        };
        this.favlist.push(content1);
      })
    });
    this.config = localStorage.getItem('conf');

    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
    if (this.customerobj) {
    try {
     this._servicemozmen.chronicdruglist(this.customerobj['patientID']).subscribe(p => {
         this.resultmozmen = p['items'];
         this.resultmozmen.forEach(e => {
             const content = {
                 'id': e['id'],
                 'res' : JSON.parse(e['jsonValue'])
             };
             this.mozmenlist.push(content);
         })
     });
 } catch (e) {
   console.log('mess', e.toString());

 }

    }
    this.signupForm = this.fb.group({
      'drugname': ['', Validators.required ],
      'Frequency': ['', Validators.required ],
      'drugid': new FormControl(null),
      'Dosetext': ['', Validators.required ],
      'Doseselect': ['', Validators.required ],
      'TNOtext': ['', Validators.required ],
      'TNOselect': ['' , Validators.required ],
      'Route' : ['0-  '],
      'qualifier': [''],
      'Administration' : [''],
      'Durationtext' : [''],
      'Durationselect' : [''],
      'Directions' : [''],
      'generic_Code' : [''],
      'erX_Code' : [''],
        'sepas_id' : ['']
    })
    this.listItem = [];




      this._service.geterxdrug().subscribe( res => {
        this.listdrugerx = res['items'];
      })



    this._service.routelist().subscribe(p => {
      this.listroute = p;
    });
    this._service.frequncylist().subscribe(p => {
      this.listfrequncy = p;
    })
  }
  down(s: any) {

  }
  read() {
    this.show = 'yes';
  }
  hide() {

    this.show = 'none';
  }
  onSearchChange(event: any) {

      // tslint:disable-next-line:triple-equals
   if (this.i.config.drug_mode == 'S' && this.termin_saleble_id == 6) {
       const key = event.target.value;
       this.serchlist = [];
       // tslint:disable-next-line:label-position
       // let serch = false;
       this.listdrug.forEach(item => {
           if (key === '') {
               this.serchlist = [];
           }
           // tslint:disable-next-line:triple-equals
           if (key != '' ) {
               // console.log('keyyyyyyyyyyy',key);
               const f = item.name ?  item.name.toLowerCase().substring(0, key.length) : '';
               if (key === f) {
                   // tslint:disable-next-line:max-line-length
                   this.serchlist.push({'name': item.name, 'id': item.id, 'iscomisin': item.isCommission, 'qty': item.storage_Qty})
                   // serch = true;

               }
           }
       });
   }
      // tslint:disable-next-line:triple-equals
      if (this.i.config.drug_mode == 'E' || this.termin_saleble_id == 7) {
          const key = event.target.value;
          this.serchlist = [];
          // tslint:disable-next-line:label-position
          // let serch = false;
          this.listdrugerx.forEach(item => {
              if (key === '') {
                  this.serchlist = [];
              }
              // tslint:disable-next-line:triple-equals
              if (key != '' ) {
                  // console.log('keyyyyyyyyyyy',key);
                  const f = item.value ?  item.value.toLowerCase().substring(0, key.length) : '';
                  if (key === f) {
                      if (this.chek_brand == true) {
                          // tslint:disable-next-line:triple-equals
                          if (item.isBrand == true) {
                              // tslint:disable-next-line:max-line-length
                              this.serchlist.push({'name': item.value, 'id': item.code, 'iscomisin': false, 'qty': 1000})
                              // serch = true;
                          }
                      } else {
                          // tslint:disable-next-line:max-line-length
                          this.serchlist.push({'name': item.value, 'id': item.code, 'iscomisin': false, 'qty': 1000})
                          // serch = true;
                      }

                  }
              }
          });
      }
  }
  set(d: any) {
    this.value = d['name'];
    this.drugid = d['id'];
    this.generic = d['generic_Code'];
    this.erX_Code = d['erX_Code'];
    this.serchlist = [];
  }
  sendData(event: any) {

    this.id1 = event.target.drugName.value;
    this.Direction = event.target.Direction.value;
    this.DAW = true;
    this.doseText = event.target.doseText.value;
   // this.DurationText = event.target.DurationText.value;
    this.dispenseText = event.target.dispenseText.value;
    const content = {
     'drugname': this.id1,
      'drugid': this.drugid,
     'Frequency': this.Frequency,
     'Frequencyid': this.frequncyid,
     'doseText': this.doseText + '' + this.Dose ,
     'disposeid': this.disid,
     'qualifier': this.qualifier,
     'Administration': this.Administration,
     'Duration': this.DurationText + this.Duration,
     'Dispense': this.dispenseText + this.Dispense,
     'Direction': this.Direction,
     'route1': this.route1,
     'DAW': this.DAW,
      'pharmecyid': this.pharmacy,
     'wardLocID': this.detail['currentLocationID']

    };
   if (this.id1 !== '') {
     this.listItem.push(content);
     this.value = '';
   } else {
     this.show_messeg('وارد کردن نام دارو الزامی است', true)
   }

  }
  getFrequency(value: any) {
    const s = value.split('-', 2);
    this.frequncyid = s[0];
    this.Frequency = s[1];
  }
  getDose(value: any) {
    this.Dose = value;
  }
  getQualifier(value: any) {
    this.qualifier = value;
  }
  getAdministration(value: any) {
    this.Administration = value;
  }
  getDuration(value: any) {
    this.Duration = value;
  }
  getDispense(value: any) {
    const s = value.split('-', 2);
    this.disid = s[0];
    this.Dispense = value;
  }
  getRoute(value: any) {
    this.route1 = value;
  }
  sendsepas() {
          //  'Drug_eRxCode': '60110',
          // 'Drug_FrequencyCode': '307435007',
          // 'Drug_RouteCode': '386357005',
          // 'Drug_TotalNumberValue': '123134',
          // 'Drug_TotalNumberUnit': 'mg'
      this.listItem.forEach(e => {
          const  d = {
              'Drug_eRxCode': e['drugid'],
              'Drug_TotalNumberValue': e['qty'].toString(),
              'Drug_TotalNumberUnit': 'mg',
              'Drug_FrequencyCode': '307435007', // e['Frequencyid'],
              'Drug_RouteCode': '386357005' , // e['routeid']
          };
          this.datasepas.push(d);
      });
    this._service.sendsepas(this.datasepas , localStorage.getItem('encounterID') , localStorage.getItem('doc_id')).subscribe( p => {
        console.log(p);
        if (p.blnSuccess == true) {
            this.ressenddata = p.strHID;
        } else {
            this.error_m = p.strError;
        }
    })
  }
  savedata() {
    this.listItem.forEach(e => {
      // const  d = {
      //   'salableID': e['drugid'],
      //   'qty': e['qty'].toString(),
      //   'packagingID': e['Tnomberid'],
      //   'frequencyUsageID': e['Frequencyid'],
      //   'routeUsageID': e['routeid'],
      //   'patientInstruction': ''
      // };
      const d =  {
            'id': 0,
            'web_API_Drug_Requset_ID': 0,
            'salable_Terminology_ID': this.termin_saleble_id,
            'salable_Code': e['drugid'],
            'qty': e['qty'],
            'frequencyUsage_SepasCode': e['Frequencyid'],
            'routeUsage_SepasCode': '',
            'packaging_Terminology_ID': 8,
            'packaging_Code': e['Tnomberid'],
            'patientInstruction': 'روزی دو بار '
        }
      this.datafinal.push(d);
    });
    if (this.datafinal.length > 0) {
      this.load = true;
      this._service.inserdruglist(this.listItem, this.datafinal, this.customerobj['currentLocationID'] , this.pharmacy).subscribe(res => {
        this.listItem = res;
        this.load = false;
        this.datafinal = [];
        if (res.success === true) {
          this.listItem = [];
          this.value = '';
          this.ressenddata = res.trackingNumber;
        }
      })
    } else {
      this.show_messeg('دارویی برای ارسال انتخاب نشده است' , true);
    }

  }
  GetDetails(content) {
      this.typemodal = 1;
    this.favlist = [];
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {

    });
    this._service.getFavList().subscribe( res => {
      this.favariteList = res['items'];
      this.favariteList.forEach(p => {
        const content1 = {
          'id': p['id'],
           'res': JSON.parse(p['jsonValue'])
        };
        this.favlist.push(content1);
      })
    })
  }
 async GetDetailsmozmen(content) {
      this.typemodal = 2;
      this.mozmenlist = [];
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {

    });
     try {
         this._servicemozmen.chronicdruglist(this.customerobj['patientID']).subscribe(p => {
             this.resultmozmen = p['items'];
             this.resultmozmen.forEach(e => {
                 const content1 = {
                     'id': e['id'],
                     'res' : JSON.parse(e['jsonValue'])
                 };
                 this.mozmenlist.push(content1);
             })
         });
     } catch (e) {
         console.log('mess', e.toString());

     }
  }
  favLIst(i: any) {
      this._service.favariteList(i).subscribe(res => {
          this.favariteList = res ;
          this.show_messeg('دارو به لیست پرکاربرد اضافه شد', true)
      })

  }
  chronic(i: any) {
    this._service.savechronic(i, this.customerobj['patientID']).subscribe(p => {
      this.show_messeg('داروی مزمن اضافه شد' , true)
    });
  }
  deleteItem(i) {
    this.listItem.splice(i, 1)
  }
  addCustomer() {
    const cust = {
      'id': 1,
      'state': '1',
    };
    this.customersService.add(cust);
  }
  sendsalamat() {
      // tslint:disable-next-line:max-line-length
      this._salamatservice.save_no(localStorage.getItem('salamattoken'), localStorage.getItem('salamatusertoken'), localStorage.getItem('citizentoken'), localStorage.getItem('samadcode'), this.cheklist).subscribe(p => {
          this.messg = p['resMessage'];
          this.trakingcode =  p['resMessage4mth'];
      });
  }
  onSubmit() {
        let frquncusplit;
        let TNO;
        let route;
        if (this.signupForm.value.Frequency) {
          frquncusplit = this.signupForm.value.Frequency.split('-', 2);

        }
        if (this.signupForm.value.TNOselect) {
          TNO = this.signupForm.value.TNOselect.split('-', 2);

        }
        if (this.signupForm.value.Route) {
          route = this.signupForm.value.Route.split('-', 2);

        }

        // tslint:disable-next-line:prefer-const
        let formdata = this.signupForm.value;
        const content = {

          'drugname': formdata['drugname'],
          'drugid': formdata['drugid'],
          'Frequency': frquncusplit ? frquncusplit[1] : '',
          'Frequencyid': frquncusplit ? frquncusplit[0] : '',
          'doseText': formdata['Dosetext'] + '' + formdata['Doseselect'],
          'dosesel' : formdata['Doseselect'],
          'dosetxt' : formdata['Dosetext'],
          'qualifier': formdata['qualifier'],
          'Administration': formdata['Administration'],
          'Duration': formdata['Durationtext'] + '' + formdata['Durationselect'],
          'Durationname': formdata['Durationtext'],
          'Durationsel':  formdata['Durationselect'],
           'T.No': TNO[1] + formdata['TNOtext']  , // + '' + TNO ? TNO[1] : '' ,
          'Tnomberid': TNO ? TNO[0] : '',
          'Direction': formdata['Directions'],
          'route': route ? route[1] : '' ,
          'routeid': route ? route[0] : '',
          'qty' : formdata['TNOtext']
        };
        this.add_item_to_list(content);
  }
  showUpdatedItem(newItem) {
    const updateItem = this.listItem.find(this.findIndexToUpdate, newItem.id);
    const index = this.listItem.indexOf(updateItem);
    const  findvalue = this.listItem[index];
    // update
    let frquncusplit;
    let TNO;
    let route;
    if (newItem['Frequency']) {
      frquncusplit = newItem['Frequency'].split('-', 2);
    }
    if (newItem['TNOselect']) {
      TNO = newItem['TNOselect'].split('-', 2);

    }
    if (newItem['Route']) {
      route = newItem['Route'].split('-', 2);

    }
    // tslint:disable-next-line:prefer-const
    let formdata = newItem;
    const content = {
      'drugname': formdata['drugname'] ? formdata['drugname'] : findvalue['drugname'],
      'drugid': formdata['drugid'] ? formdata['drugid'] : findvalue['drugid'],
      'Frequency': frquncusplit ? frquncusplit[1] : findvalue['Frequency'],
      'Frequencyid': frquncusplit ? frquncusplit[0] : findvalue['Frequencyid'],
      // tslint:disable-next-line:max-line-length
      'doseText': formdata['Dosetext'] ? formdata['Dosetext'] : findvalue['Dosetext'] + '' + formdata['Doseselect'] ? formdata['Doseselect'] : findvalue['Doseselect'] ,
      'dosesel' : formdata['Doseselect'] ? formdata['Doseselect'] :  findvalue['Doseselect'],
      'dosetxt' : formdata['Dosetext'] ?   formdata['Dosetext'] : findvalue['Dosetext'] ,
      'qualifier': formdata['qualifier'] ? formdata['qualifier'] : findvalue['Dosetext'] ,
      'Administration': formdata['Administration'] ? formdata['Administration'] : findvalue['Administration'] ,
      // tslint:disable-next-line:max-line-length
      'Duration': formdata['Durationtext'] ? formdata['Durationtext'] : findvalue['Durationtext'] + '' + formdata['Durationselect'] ? formdata['Durationselect'] : findvalue['Durationselect']  ,
      'Durationname': formdata['Durationtext'] ? formdata['Durationtext'] : findvalue['Durationtext'] ,
      'Durationsel':  formdata['Durationselect'] ? formdata['Durationselect'] : findvalue['Durationselect'] ,
      'T.No': formdata['TNOtext'] ? formdata['TNOtext'] : findvalue['TNOtext'],
      'Tnomberid': TNO ? TNO[0] :  findvalue['Tnomberid'],
      'Direction': formdata['Directions'] ? formdata['Directions'] :  findvalue['Direction'],
      'route': route ? route[1] : findvalue['route'] ,
      'routeid': route ? route[0] : findvalue['routeid'] ,
    };
    this.listItem[index] = content;

  }
  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }
  edit(i: any) {
    this.editrecord = i;
  }
  async deletfav(id: any) {
   await this._service.deletefav(id).subscribe(p => {
     this._service.getFavList().subscribe( res => {
       this.favariteList = res['items'];
       this.favlist = [];
         // tslint:disable-next-line:no-shadowed-variable
       this.favariteList.forEach( p => {
         const content1 = {
           'id': p['id'],
           'res': JSON.parse(p['jsonValue'])
         };
         this.favlist.push(content1);
       })
     })
    })
  }
  chekfav(i: any) {
      this.add_item_to_list(i);
  }


  setdrug(i: any , event: any) {
    // this.listItem = [];
   if (i) {
     const  y = JSON.parse(i);
     y.forEach( p => {
       this.add_item_to_list(p);
     })
   } else {

   }
  }
  getID(value: string) {
    this.id1 = value;
    this._service.getdruglist(this.id1).subscribe( res => {
      this.listdrug = res;


    })
  }
    test() {
        this.printValid = true
    }
  editsave() {
    this.listItem.forEach(e => {
      const  d = {
        'salableID': e['drugid'],
        'qty': e['qty'].toString(),
        'packagingID': e['Tnomberid'],
        'frequencyUsageID': e['Frequencyid'],
        'routeUsageID': e['routeid'],
        'patientInstruction': e['Frequency'] + e['doseText']
      };
      this.datafinal.push(d);
    });

      const  content = {
        'id': this.resedit['id'],
        'rayavaran_WardRequest_ID': this.resedit['rayavaran_WardRequest_ID'],
        'wardRequestItems': this.datafinal,
        'jsonValue': JSON.stringify(this.listItem)
      }
      // console.log('connnnnn', content)
     this._service.save_edite_drug(content).subscribe( j => {
       this.listItem = [];
         this._service.getlistdrug(localStorage.getItem('encounterID')).subscribe( h => {
             this.show_messeg('بروز رسانی اطلاعات با موفقیت انجام شد' , true);
             this.listItem = [];
             this.resedit = h['items'][0];
             this.status = h['items'] ? h['items'][0]['rayavaran_WardRequest_Status_Code'] : '';
             h['items'].forEach( l => {
                 this.historydrougenconter = JSON.parse(l['jsonValue'])
                 const g = JSON.parse(l['jsonValue']);

                 g.forEach( k => {
                     this.listItem.push(k)

                 })
             })
         });
     })
  }
  add_item_to_list(item: any) {
      // tslint:disable-next-line:max-line-length
      this._salamatservice.getdetailnoskhe(localStorage.getItem('salamattoken'), localStorage.getItem('salamatusertoken'), localStorage.getItem('citizentoken'), localStorage.getItem('samadcode'), item).subscribe(p => {
         this.re = p;
          if (p['info'] ? p['info']['isAllowed'] == false : false) {
              this.messg = 'شما قادر به تجویز این دارو نمیباشید';
              this.alarm = p['info']['message'];
          } else {
              this.alarm = p['info'] ? p['info']['message'] : '';
              this.cheklist.push(p['info']['checkCode']);

          }
      });
    const persons =  this.listItem.find(x => x.drugname == item['drugname']);
    // tslint:disable-next-line:triple-equals
      const persons_d =  this.listdrug.find(x => x.name == item['drugname']);

      // tslint:disable-next-line:triple-equals
      const  persons_d_e = this.listdrugerx.find(x => x.value == item['drugname']);

    if (!persons) {
        if (persons_d || persons_d_e) {
            this.listItem.push(item);
            document.getElementById('namedrug').focus();
            this.show = 'none';
            this.signupForm.reset();
            if (this.i.config.drug_mode == 'S') {
                this.termin_saleble_id = 6;
                this.ischek = false;
            }
            this.ischek = false;
        } else {
            document.getElementById('namedrug').focus();
            this.show = 'none';
            this.signupForm.reset();
            this.show_messeg('نام دارو غیر معتبر میباشد' , true)
        }

    } else {
      document.getElementById('namedrug').focus();
      this.show = 'none';
      this.signupForm.reset();
       this.show_messeg('داروی تکراری یافت شد' , true)
    }
  }
    show_messeg(mess: any, sh: boolean) {
      this.messgshow = sh;
      this.messag = mess;
    }
    closem() {
        this.messgshow = false;
    }
    async  deletmozmen(id: any) {
        await  this._servicemozmen.deletchronic(id).subscribe(p => {
            this._servicemozmen.chronicdruglist(this.customerobj['patientID']).subscribe(p => {
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
    call(i: any) {
      if (i.checked) {
          this.chek_brand = false;
      } else {
          this.chek_brand = true;
      }
    }
    SetTerminology(e : any) {
      if (e.checked) {
          this.termin_saleble_id = 7;
          this.ischek = true;
      } else {
          this.termin_saleble_id = 6;
          this.ischek = false;
      }

    }
}

