import { Component, OnInit, Input, ViewChild, OnDestroy, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from '../animations/custom-animations';
import { ConfigService } from '../services/config.service';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import {HospitalService } from '../../services/hospital/hospital.service';
import {HttpClient} from '@angular/common/http';
import { PageService} from './../../services/pages/page.service'
import {Customer} from '../../core/store/customer';
import {CustomersService} from '../../core/store/customers.service';
import {ROUTES1} from './sidebarlab-routes.config';
import {LocalStorageService} from '../../sevices/local-storage.service.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleIcon', {static: false}) toggleIcon: ElementRef;
  customers: string;
  stateHistory = null;
  isHistoryVisible = false;
  subs = new Subscription();
  public menuItems: any[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/logos/loogoo.png';
  public config: any = {};
  layoutSub: Subscription;
  type: string;
  hospital: any;
  page = '';
  private conterdetail: any;
  conterdetailn: any;
  private customerobj: any;
  private resstate: Customer;
   packsurl: any ;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private configService: ConfigService,
    private layoutService: LayoutService,
    private _service: HospitalService,
    private http: HttpClient,
    private customersService: CustomersService,
    private localStorageService: LocalStorageService,
    private  i: ApiconfigserviceService,

  ) {

    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }

    this.layoutSub = layoutService.customizerChangeEmitted$.subscribe(
      options => {
        if (options) {
          if (options.bgColor) {
            if (options.bgColor === 'white') {
              this.logoUrl = 'assets/img/logo-dark.png';
            } else {
              this.logoUrl = 'assets/img/logo.png';
            }
          }

          if (options.compactMenu === true) {
            this.expanded = false;
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = true;
          } else if (options.compactMenu === false) {
            this.expanded = true;
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = false;
          }

        }
      });

  }


  ngOnInit() {
    this.packsurl = this.i.config.packs_url;
    this.type = '0';
    this.subs.add(this.customersService.stateChanged.subscribe(state => {
      if (state) {
        this.resstate = state.customer;
        this.customers = JSON.stringify(state.customer['res']);
        this.customerobj = JSON.parse(this.customers);
      }
    }));
    this.config = this.configService.templateConf;
    if (this.resstate.state === '2') {

      this.menuItems = ROUTES1;
    } else {
      this.menuItems = ROUTES;
    }
    this._service.getAll().subscribe(res => {
      this.hospital = res.hospitalName
    });
    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/logo-dark.png';
    } else {
      this.logoUrl = 'assets/img/logo.png';
    }


  }
  setvisit() {

    this._service.setvisit().subscribe(p => {
      if (p['success'] === true) {
        alert('ویزیت بیمار با موفقیت انجام شد');
        this.router.navigate(['/DoctorDashboard/patientList']);

      }
    })
  }
  addCustomer() {
    const cust = {
      'id': 1,
      'state': '1',
      'patientID': '12345'
    };
    this.customersService.add(cust);
  }
  ngAfterViewInit() {

    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed != undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = true;
        } else if (this.config.layout.sidebar.collapsed === false) {
          this.expanded = true;
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = false;
        }
      }
    }, 0);


  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf('forms/ngx') !== -1) {
      this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
    }
  }
}
