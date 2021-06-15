import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PrescriptionServicesService} from '../../services/prescription-services.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomersService} from '../../core/store/customers.service';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {ProfileseviceService} from '../../services/profilesevice.service';
import {PatientListServiceService} from '../../services/patient-list-service.service';

@Component({
  selector: 'app-add-drug-nos',
  templateUrl: './add-drug-nos.component.html',
  styleUrls: ['./add-drug-nos.component.css']
})
export class AddDrugNosComponent implements OnInit {

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
   fav_id: any;
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
  favlist:  Array<any> = [];
  conterdetail: any;
  title1 = 'jkhasjk';
  listroute: [];
  editrecord: any;
  disid: any;
  drugid: any;
  customerobj: any;
  listfrequncy: any;
  config: any;
  itemset = new Array();
  messg: any;
  erX_Code: any;
  itemtemp: Array<any> = [];
  favtemplist:  Array<any> = [];
  checked: any;
  url: any;
  mozmenlist:  Array<any> = [];
  profileform: FormGroup;
  messgshow: boolean;
  messag: any;
  typemodal: number;
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private  _service: PrescriptionServicesService,
      private modalService: NgbModal,
      private customersService: CustomersService,
      private fb: FormBuilder,
      private _ser_profile: ProfileseviceService,
      private element: ElementRef<HTMLInputElement>,
      private  _salamatservice: SalamatserviceService,
      private  i: ApiconfigserviceService,
      private  _servicemozmen: PatientListServiceService,
  ) {
    this._service.setMyGV(this.i.config.API_URL);
    this._ser_profile.seturl(this.i.config.API_URL);
    this.url = this.i.config.API_URL;
    this._servicemozmen.setMyGV(this.i.config.API_URL)
    this.route.paramMap.subscribe(params => {
      this.pharmacy = params.get('');
    });
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
    this.profileform = this.fb.group({
      'name': ['', Validators.required ],
    });
    this.typemodal=1;
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

    this._ser_profile.gae_fav(2).subscribe( h => {
      this.itemset = [];
      this.favdrug = h['items'];
      this.favdrug.forEach( p => {
        console.log('ppppppppp', p['id'])
        const  content = {
          'id': p['id'],
          'favename': p['favoriteName'],
          'res' : p['jsonValue'] ? JSON.parse(p['jsonValue']) : ''
        };
        this.itemset.push(content);
      })
    });
    // this._service.getlistdrug(localStorage.getItem('encounterID')).subscribe( h => {
    //   this.resedit = h['items'][0];
    //   this.status = h['items'] ? h['items'][0]['rayavaran_WardRequest_Status_Code'] : '';
    //   h['items'].forEach( l => {
    //     this.historydrougenconter = JSON.parse(l['jsonValue'])
    //     const g = JSON.parse(l['jsonValue']);
    //
    //     g.forEach( k => {
    //       this.listItem.push(k)
    //
    //     })
    //   })
    // });

    // this._service.getFavList().subscribe( res => {
    //   this.favariteList = res['items'];
    //   this.favariteList.forEach(p => {
    //     const content1 = {
    //       'id': p['id'],
    //       'res': JSON.parse(p['jsonValue'])
    //     };
    //     this.favlist.push(content1);
    //   })
    // });
    this.config = localStorage.getItem('conf');

    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
    // if (this.customerobj) {
    //   try {
    //     this._servicemozmen.chronicdruglist(this.customerobj['patientID']).subscribe(p => {
    //       this.resultmozmen = p['items'];
    //       this.resultmozmen.forEach(e => {
    //         const content = {
    //           'id': e['id'],
    //           'res' : JSON.parse(e['jsonValue'])
    //         };
    //         this.mozmenlist.push(content);
    //       })
    //     });
    //   } catch (e) {
    //     console.log('mess',e.toString());
    //
    //   }
    //
    // }
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
      'erX_Code' : ['']
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
    const key = event.target.value;
    this.serchlist = [];
    // tslint:disable-next-line:label-position
    // let serch = false;
    this.listdrug.forEach(item => {
      if (key === '') {
        this.serchlist = [];
      }
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
      this.show_messeg('وارد کردن نام دارو الزامی است',true)
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
  savedata() {
    // this.listItem.forEach(e => {
    //   const  d = {
    //     'salableID': e['drugid'],
    //     'qty': e['qty'],
    //     'packagingID': e['Tnomberid'],
    //     'frequencyUsageID': e['Frequencyid'],
    //     'routeUsageID': e['routeid'],
    //     'patientInstruction': ''
    //   };
    //   this.datafinal.push(d);
    // });
    // if (this.datafinal.length > 0) {
    //   this.load = true;
    //   this._service.inserdruglist(this.listItem, this.datafinal, this.customerobj['currentLocationID'] , this.pharmacy).subscribe(res => {
    //     this.listItem = res;
    //     this.load = false;
    //     this.datafinal = [];
    //     if (res.success === true) {
    //       this.listItem = [];
    //       this.value = '';
    //       this.ressenddata = res.trackingNumber;
    //     }
    //   })
    // } else {
    //   this.show_messeg('دارویی برای ارسال انتخاب نشده است' , true);
    // }
    if (this.listItem.length > 0) {
      this._ser_profile.Add_fav(this.fav_id , this.listItem).subscribe(res => {
        if (res.success === true) {
          this.listItem = [];
          this.show_messeg('اطلاعات با موفقیت ثبت شد' , true);
          this._ser_profile.gae_fav(2).subscribe( h => {
            this.itemset = [];
            this.favdrug = h['items'];
            this.favdrug.forEach( p => {
              console.log('ppppppppp', p['id'])
              const  content = {
                'id': p['id'],
                'favename': p['favoriteName'],
                'res' : p['jsonValue'] ? JSON.parse(p['jsonValue']) : ''
              };
              this.itemset.push(content);
            })
          });
        }
      })
    } else {
      this.show_messeg('آزمایشی برای ارسال انتخاب نشده است' , true);
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
    console.log(i)
    let chek = false;
    this.favlist.forEach( u => {
      if (i['drugname'] === u['res']['drugname']) {
        chek = true;
      }
    });
    if (chek) {
      this.show_messeg('داروی انتخابی در لیست وجود دارد',true)
    } else {
      this._service.favariteList(i).subscribe(res => {
        this.favariteList = res ;
        chek = false;
        this.show_messeg('دارو به لیست پرکاربرد اضافه شد',true)
      })
    }

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
  onSubmit_drug() {
      this._ser_profile.create_fav(this.profileform.value.name, 2).subscribe( p => {
        this._ser_profile.gae_fav(2).subscribe( h => {
          this.itemset = [];
          this.favdrug = h['items'];
          // tslint:disable-next-line:no-shadowed-variable
          this.favdrug.forEach( p => {
            const  content = {
              'id': p['id'],
              'favename': p['favoriteName'],
              'res' : p['jsonValue'] ? JSON.parse(p['jsonValue']) : ''
            };
            this.itemset.push(content);
          })
          console.log('dddddd', this.itemset)
        });
      });
    this.profileform.reset();
    document.getElementById('test').focus();
  }
  onSubmit() {
    // tslint:disable-next-line:max-line-length
    this._salamatservice.getdetailnoskhe(localStorage.getItem('salamattoken'), localStorage.getItem('salamatusertoken'), localStorage.getItem('citizentoken'), localStorage.getItem('samadcode'), this.signupForm.value).subscribe(p => {
      this.messg = p['resMessage'];
    });

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
        this.favariteList.forEach(p => {
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
    this.listItem = [];
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
  editsave() {
    this.listItem.forEach(e => {
      const  d = {
        'salableID': e['drugid'],
        'qty': e['qty'],
        'packagingID': e['Tnomberid'],
        'frequencyUsageID': e['Frequencyid'],
        'routeUsageID': e['routeid'],
        'patientInstruction': ''
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
        this.show_messeg('بروز رسانی اطلاعات با موفقیت انجام شد' , true)
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
    const persons =  this.listItem.find(x => x.drugname == item['drugname']);
    // tslint:disable-next-line:triple-equals
    const persons_d =  this.listdrug.find(x => x.name == item['drugname']);
    if (!persons) {
      if (persons_d) {
        this.listItem.push(item);
        document.getElementById('namedrug').focus();
        this.show = 'none';
        this.signupForm.reset();
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
  set_id(id: any) {
    this.fav_id = id;
    if (this.itemset.length > 0) {
      this.itemset.forEach( p => {
        if (p['res']) {
          if (p['id'] == this.fav_id) {
            p['res'].forEach( h => {
              this.listItem.push(h);
            })
          }
        }

      })
    }
  }

  delete(i: any) {

    this.listItem.splice(i, 1);
  }
  delete_item(id: any) {
    if (confirm('برای حذف اطمینان دارید؟')) {
      this._ser_profile.delet_fav(id).subscribe( p => {
        this._ser_profile.gae_fav(2).subscribe( h => {
          this.itemset = [];
          this.favdrug = h['items'];
          this.favdrug.forEach( p => {
            console.log('ppppppppp', p['id'])
            const  content = {
              'id': p['id'],
              'favename': p['favoriteName'],
              'res' : p['jsonValue'] ? JSON.parse(p['jsonValue']) : ''
            };
            this.itemset.push(content);
          })
          console.log('dddddd', this.itemset)
        });
      })
    }

  }
}
