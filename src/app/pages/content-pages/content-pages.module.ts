import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {FormsModule, ReactiveFormsModule, } from '@angular/forms';



import { ContentPagesRoutingModule } from './content-pages-routing.module';

import { ErrorPageComponent } from './error/error-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import {LogoItemComponent} from './../../logo-item/logo-item.component';
import { AllPatientComponent } from './all-patient/all-patient.component';
import {ComingSoonPageComponent} from './coming-soon/coming-soon-page.component';
import {d_loginPageComponent} from './login/doctor-login-page/doctor-login-page.component';
import {MaintenancePageComponent} from './maintenance/maintenance-page.component';
import {FaqComponent} from '../full-pages/faq/faq.component';
import {GalleryPageComponent} from '../full-pages/gallery/gallery-page.component';
import {InvoicePageComponent} from '../full-pages/invoice/invoice-page.component';
import {KnowledgeBaseComponent} from '../full-pages/knowledge-base/knowledge-base.component';
import {SearchComponent} from '../full-pages/search/search.component';
import {HorizontalTimelineComponent} from '../full-pages/timeline/horizontal/component/horizontal-timeline.component';
import {HorizontalTimelinePageComponent} from '../full-pages/timeline/horizontal/horizontal-timeline-page.component';
import {VerticalTimelinePageComponent} from '../full-pages/timeline/vertical/vertical-timeline-page.component';
import {UserProfilePageComponent} from '../full-pages/user-profile/user-profile-page.component';
import {CustomizerComponent} from '../../shared/customizer/customizer.component';
import {SearchPipe} from '../../shared/pipes/search.pipe';
import {JSONValidator} from 'ng2-validation/dist/json/directive';
import {NumberValidator} from 'ng2-validation/dist/number/directive';


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        DpDatePickerModule,



    ],
    exports: [
        RegisterPageComponent,


    ],
    declarations: [
        ErrorPageComponent,
        ForgotPasswordPageComponent,
        LoginPageComponent,
        RegisterPageComponent,
        LogoItemComponent,
        AllPatientComponent,
        ComingSoonPageComponent,
        d_loginPageComponent,
        MaintenancePageComponent,
        FaqComponent,
        GalleryPageComponent,
        InvoicePageComponent,
        KnowledgeBaseComponent,
        SearchComponent,
        HorizontalTimelineComponent,
        HorizontalTimelinePageComponent,
        VerticalTimelinePageComponent,
        UserProfilePageComponent,
        CustomizerComponent,
        SearchPipe,
        JSONValidator,
        NumberValidator

    ]
})
export class ContentPagesModule { }
