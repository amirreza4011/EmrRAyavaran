import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';

import * as moment from 'jalali-moment';
import { JalaliPipe} from './../../filters/dateFilter'
import {HospitalService} from '../../services/hospital/hospital.service';
import {Router} from '@angular/router';
import {CustomersService} from '../../core/store/customers.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  customers: any;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  // today = new Date();
  //  d = this.today.getDay();
  //  m = this.today.getMonth();
  //  y = this.today.getFullYear();
  //   FullDate = this.d.toString() +'/'+this.m.toString() + '/' +this.y.toString();
  today = new Date().toLocaleDateString('fa-IR');

  currentLang = 'fa';
  toggleClass = 'ft-maximize';
  placement = 'bottom-right';
  public isCollapsed = true;
  layoutSub: Subscription;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};
   customerobj: any;
   url: any;

  constructor( private _service: HospitalService,
               private customersService: CustomersService,
               private router: Router,
               public translate: TranslateService,
               private layoutService: LayoutService,
               private configService: ConfigService,
               private  i: ApiconfigserviceService
  ) {
    const browserLang = 'fa';
    translate.use(browserLang.match(/fa|en|es|pt|de/) ? browserLang : 'fa');
    this._service.setMyGV(this.i.config.API_URL);
    this.url =this.i.config.API_URL;
    this.layoutSub = layoutService.changeEmitted$.subscribe(
      direction => {
        const dir = direction.direction;
        if (dir === 'rtl') {
          this.placement = 'bottom-left';
        } else if (dir === 'ltr') {
          this.placement = 'bottom-right';
        }
      });
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        if (state) {
          this.customers = JSON.stringify(state.customer['res']);
          this.customerobj = JSON.parse(this.customers);
        }

      }
    }));
  }
  setvisit() {

    this._service.setvisit().subscribe(p => {
      if (p['success'] === true) {
        alert('ویزیت بیمار با موفقیت انجام شد');
        this.router.navigate(['/DoctorDashboard/patientList']);

      }
    })
  }

  ngAfterViewInit() {
    if (this.config.layout.dir) {
      setTimeout(() => {
        const dir = this.config.layout.dir;
        if (dir === 'rtl') {
          this.placement = 'bottom-left';
        } else if (dir === 'ltr') {
          this.placement = 'bottom-right';
        }
      }, 0);

    }
  }
  logOut() {
    localStorage.removeItem('encounterid');
    localStorage.removeItem('type');
    localStorage.removeItem('userToken');
    localStorage.removeItem('token');
    localStorage.removeItem('encounterID');
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize';
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitNotiSidebarChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName('app-sidebar')[0];
    if (appSidebar.classList.contains('hide-sidebar')) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }
}
