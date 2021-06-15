import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorDashboardComponent} from './../doctor/doctor-dashboard/doctor-dashboard.component';
import { PrescriptionComponent} from './prescription/prescription.component';
import { LaboratoryRequestComponent} from './../doctor/laboratory-request/laboratory-request.component';
import {DrugRecordComponent} from './drug-record/drug-record.component';
import {LabRecordComponent} from './lab-record/lab-record.component';
import {DrugOrderComponent} from './drug-order/drug-order.component';
import {NewPrescriptionComponent} from './new-prescription/new-prescription.component';
import {HomePageComponent} from './home-page/home-page.component';
import  { ShowResultTableComponent} from './show-result-table/show-result-table.component';
import {WaitngPageComponent} from './waitng-page/waitng-page.component';
import {RadiologyorderComponent} from './radiologyorder/radiologyorder.component';
import {TasvirComponent} from './tasvir/tasvir.component';
import {OtherComponent} from './other/other.component';
import {HistorynosComponent} from './historynos/historynos.component';
import {HistoryobservationComponent} from './historyobservation/historyobservation.component';
import {HistorytestComponent} from './historytest/historytest.component';
import {DoctorprofileComponent} from './doctorprofile/doctorprofile.component';
import {AddDrugNosComponent} from './add-drug-nos/add-drug-nos.component';
import {CreateuserComponent} from './createuser/createuser.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'patientList',
        component: DoctorDashboardComponent,
        data: {
          title: 'doctor Dashboard'
        }
      },
      {
        path: 'prescription',
        component: PrescriptionComponent ,
        data: {
          title: 'prescription'
        }
      },
      {
        path: 'laboratoryRequest',
        component: LaboratoryRequestComponent ,
        data: {
          title: 'Laboratory Request'
        }
      },
      {
        path: 'drugRecord',
        component: DrugRecordComponent ,
        data: {
          title: 'Drug Reord'
        }
      },
      {
        path: 'labRecord',
        component: LabRecordComponent ,
        data: {
          title: 'Lab Record'
        }
      },
      {
        path: 'drugOrder',
        component: DrugOrderComponent,
        data : {
          title: 'Drug Order'
      }
      },
      {
        path: 'NewPrescription/:',
        component: NewPrescriptionComponent,
        data : {
          title: 'New Prescription'
        }
      },
      {
        path: 'homePage/:id',
        component: HomePageComponent,
        data : {
          title: 'Home Page'
        },
      },

      {
        path: 'showResult',
        component: ShowResultTableComponent,
        data: {
          title: 'Show Result'
        }
      },
      {
        path: 'waiting',
        component: WaitngPageComponent,
        data: {
          title: 'Waiting'
        }
      },
      {
        path: 'Physiotherapy',
        component: RadiologyorderComponent,
        data: {
          title: 'radiologyorder'
        }
      },
      {
        path: 'tasvir',
        component: TasvirComponent,
        data: {
          title: 'tasvir'
        }
      },
      {
        path: 'other',
        component: OtherComponent,
        data: {
          title: 'other'
        }
      },
      {
        path: 'historydrugstore',
        component: HistorynosComponent,
        data: {
          title: 'drugh'
        }
      },
      {
        path: 'histryobser',
        component: HistoryobservationComponent,
        data: {
          title: 'obser'
        }
      },
      {
        path: 'historytest',
        component: HistorytestComponent,
        data: {
          title: 'test'
        }
      }
      ,
      {
        path: 'doctorprofile',
        component: DoctorprofileComponent,
        data: {
          title: 'user'
        }
      }
      ,
      {
        path: 'add_drug_nos',
        component: AddDrugNosComponent,
        data: {
          title: 'droug_add'
        }
      }
      ,
      {
        path: 'createuser',
        component: CreateuserComponent,
        data: {
          title: 'usercre'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// tslint:disable-next-line:class-name
export class doctorRoutingModule { }
