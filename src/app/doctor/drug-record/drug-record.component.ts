import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DrugRecordService} from './../../services/history/drug-record.service';
import {ActivatedRoute, Route, Router} from '@angular/router';


@Component({
  selector: 'app-drug-record',
  templateUrl: './drug-record.component.html',
  styleUrls: ['./drug-record.component.scss']
})
export class DrugRecordComponent implements OnInit {
  historyList: any[];
  encounterId = '';
  listReq: any[];
  itemList:any[];
  constructor(
      private modalService: NgbModal,
      private _service: DrugRecordService,
      private activatedRoute: ActivatedRoute,
      private  _drugrec: DrugRecordService,

  ) { }


  ngOnInit() {
    localStorage.removeItem('page');
    localStorage.setItem('page','2');
    this.postDrugReq();
  }
  openDrugModal(content,id) {
    alert(id);
     let prescriptionID =id;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
    });

    this._drugrec.getDurgItem(prescriptionID).subscribe(res => {
      this.itemList = res;
    })
  }
  postDrugReq() {
    this._drugrec.getDrugRec().subscribe( res => {

      console.log(res);
      this.listReq = res;

    })
  }


}
