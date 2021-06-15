import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {PatientListServiceService} from './../../../services/patient-list-service.service';
import { DrugRecordService} from './../../../services/history/drug-record.service'

@Component({
  selector: 'app-all-patient',
  templateUrl: './all-patient.component.html',
  styleUrls: ['./all-patient.component.scss']
})
export class AllPatientComponent implements OnInit {
  dateObject  = '';
  start = '';
  end = '';
  isviseted = '';
  dateObject1 = '';
  result: any [];
  nationalCOde: any = "";
  encounterId: any;
  encunter = '';
  listReq:any[];
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private  _service: PatientListServiceService,
      private  _drugrec: DrugRecordService,
  ) {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/pages/login']);
    }
  }
  postDatestartdate(event: any) {
    this.start = event;
  }
  postDateenddate(event: any) {
    this.end = event;
  }
  postDate(event: any) {
    this.isviseted = event.target.chekvi.value;
    this.nationalCOde = event.target.nationalCode.value;
    this._service.postPractitioner(this.start, this.end, this.isviseted, this.nationalCOde).subscribe(res => {
      this.result = res;
    })
  }

  postDrugReq() {
    this.route.paramMap.subscribe(params => {
      this.encounterId = params.get('encounterID');
    });
    alert(this.encounterId);
    this.encunter = localStorage.getItem('encounterID');
    localStorage.setItem('encounterID', this.encounterId);
    // this._drugrec.getDrugRec().subscribe( res => {
    //   console.log(res);
    //   this.listReq = res;
    // })
  }

  ngOnInit() {
    this._service.getList().subscribe( res => {
      this.result = res;

    })
  }

}
