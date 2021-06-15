import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { PatinetTestAnswerComponent } from "./patinet-test-answer/patinet-test-answer.component";
import { TestResultComponent } from './test-result/test-result.component';
import { PrintAllComponent } from './print-all/print-all.component';
import { InformationComponent } from './information/information.component';
import {PrintService} from './../services/print.service'
import {NgxPrintModule} from 'ngx-print';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RadiologyComponent } from './radiology/radiology.component';





@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgxPrintModule,
        MatProgressSpinnerModule
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        PatinetTestAnswerComponent,
        TestResultComponent,
        PrintAllComponent,
        InformationComponent,
        RadiologyComponent,

    ],
    providers: [PrintService],
})
export class DashboardModule { }
