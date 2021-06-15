import { Component, OnInit } from '@angular/core';
import  { IPersonServiceService} from './../../services/i-person-service.service'
import { LabratoryTestServiceService} from  './../../services/labratory-test-service.service'
import {data} from '../../shared/data/smart-data-table';
// import any = jasmine.any;
import {json} from 'ng2-validation/dist/json';
@Component({
  selector: 'app-patinet-test-answer',
  templateUrl: './patinet-test-answer.component.html',
  styleUrls: ['./patinet-test-answer.component.scss']
})
export class PatinetTestAnswerComponent implements OnInit {
  personInfo  = [];
  testLaboratory  =[];
  labReq =[];


  constructor( private _service: IPersonServiceService ,
                private _test: LabratoryTestServiceService,
                private  _req: IPersonServiceService,
               ) {

  }
  ngOnInit() {
    // tslint:disable-next-line:no-shadowed-variable
    // @ts-ignore
    // tslint:disable-next-line:no-shadowed-variable
    this._service.getData().subscribe(data => {
      this.personInfo = [];

      this.personInfo.push(data)
    });
   this._test.getlabratoryTest().subscribe( res =>{
     this.testLaboratory =[];

     this.testLaboratory.push(res)
   });
    // this._req.getReqData().subscribe(res => {
    //     this.labReq = [];
    //   this.labReq = res;
    //  // this.labReq.push(res);
    // });




  }

}
