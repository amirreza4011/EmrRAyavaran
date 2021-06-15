import { RouteInfo } from './sidebar.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
    // tslint:disable-next-line:max-line-length
    { path: '/DoctorDashboard/patientList', title: 'لیست بیماران ', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    // tslint:disable-next-line:max-line-length
    { path: '/DoctorDashboard/homePage/' + localStorage.getItem('encounterID'), title: 'ثبت نسخه دارویی', icon: 'ft-copy', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    // tslint:disable-next-line:max-line-length
    // { path: '/DoctorDashboard/laboratoryRequest', title: 'درخواست خدمات ', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    {
        // tslint:disable-next-line:max-line-length
        path: '', title: 'درخواست خدمات', icon: 'ft-edit', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
            // tslint:disable-next-line:max-line-length
            { path: '/DoctorDashboard/laboratoryRequest', title: 'آزمایشگاه', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // tslint:disable-next-line:max-line-length
            { path: '/DoctorDashboard/Physiotherapy', title: 'فيزيوتراپ', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // tslint:disable-next-line:max-line-length
            { path: '/DoctorDashboard/tasvir', title: 'تصویربرداری', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // tslint:disable-next-line:max-line-length
            { path: '/DoctorDashboard/other', title: ' سایر', icon: 'ft-crosshair', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

        ]
    },
       {
           // tslint:disable-next-line:max-line-length
        path: '', title: 'سوابق بیمار(EMR)', icon: 'ft-edit', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
               // tslint:disable-next-line:max-line-length
            { path: '/DoctorDashboard/historydrugstore', title: 'نسخه های بیمار', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
               // tslint:disable-next-line:max-line-length
            { path: '/DoctorDashboard/historytest', title: 'آزمایشات بیمار', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
               // tslint:disable-next-line:max-line-length
            { path: '/DoctorDashboard/histryobser', title: 'تشخیص ها برای بیمار', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },

];
