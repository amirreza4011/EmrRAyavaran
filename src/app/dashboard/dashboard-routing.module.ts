import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { PatinetTestAnswerComponent } from "./patinet-test-answer/patinet-test-answer.component";
import  { TestResultComponent} from './test-result/test-result.component';
import { PrintAllComponent} from './../dashboard/print-all/print-all.component'
import {RadiologyComponent} from './radiology/radiology.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'patientDashboard',
        component: Dashboard1Component,
        data: {
          title: 'patient Dashboard'
        }
      },
      {
        path: 'testAnswer',
        component: PatinetTestAnswerComponent,
        data: {
          title: 'test Answer '
        }
      },
      {
        path: 'testResult/:orderDocID',
        component: TestResultComponent,
        data:{
          title: 'Test Result'
        }
      },
      {
        path: 'printAll',
        component: PrintAllComponent,
        data: {
          title: 'Print All'
        }
      },
      {
        path: 'radiology',
        component: RadiologyComponent,
        data: {
          title: 'Radio Logy'
        }
      },




    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
