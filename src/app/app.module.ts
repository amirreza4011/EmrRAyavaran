import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {NgxPrintModule} from 'ngx-print';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTablesModule } from 'angular-datatables';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { DragulaService } from 'ng2-dragula';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { TodoState } from './states/todo-state';
import { LocalStorageService } from './sevices/local-storage.service.service';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};
import {NgxsModule} from '@ngxs/store';
import { environment } from '../environments/environment';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { Home2Component } from './home2/home2.component';
import { AutofocusDirectiveDirective } from './autofocus-directive.directive';
import {ReactiveFormsModule} from '@angular/forms';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {ApiconfigserviceService} from './service/apiconfigservice.service';
import { NgxBarcodeModule } from 'ngx-barcode';
import { TestComponent } from './test/test.component';
import {PatientListServiceService} from './services/patient-list-service.service';
import { HelloComponent } from './hello/hello.component';
export const configFactory = (configService: ApiconfigserviceService) => {
  return () => configService.loadConfig();
};
@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, Home2Component, AutofocusDirectiveDirective, TestComponent, HelloComponent, ],
  imports: [
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    NgxBarcodeModule,
    NgxsModule.forRoot([TodoState], { // here login state
      developmentMode: !environment.production
    }),
    NgxPrintModule,
    DataTablesModule,
    AngularFontAwesomeModule,
    NgxsModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AppRoutingModule,
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR KEY'
    }),
    PerfectScrollbarModule,
    ReactiveFormsModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    LocalStorageService,
    DragulaService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ApiconfigserviceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
