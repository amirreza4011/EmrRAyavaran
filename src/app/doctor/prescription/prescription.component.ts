import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PrescriptionServicesService} from './../../services/prescription-services.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {


    myControl = new FormControl();
        List: any[];

    datalist: any[];
    filteredOptions: Observable<string[]>;


    constructor(
      private modalService: NgbModal,
  ) {}
  GetDetails(content) {

      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      }, (reason) => {
      });
  }
  ngOnInit() {

  }
}
