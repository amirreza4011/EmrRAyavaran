import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {PatientListServiceService} from '../services/patient-list-service.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
     // @Inject(forwardRef(() => PatientListServiceService)) private _service1 = PatientListServiceService
  ) { }

  ngOnInit(): void {
  }

}
