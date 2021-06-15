// import { Injectable } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
//
// @Injectable()
// export class ProfileseviceService {
//   baseurl: any;
//   create_fav_url = '/api/Setting/Create_Practitioner_Order_Favorite';
//   constructor(private http: HttpClient) { }
//   seturl(url: any) {
//     this.baseurl = url;
//   }
//   create_fav(username: string, password: string) {
//     const data = {
//       'orderGroup': '2',
//       'favoriteName': 'string'
//     };
//
//     const body = JSON.stringify(data );
//     const headers = {  'Content-Type': 'application/json' };
//     const headerDict = {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer  ' + localStorage.getItem('token')
//
//     }
//     const requestOptions = {
//       headers: new Headers(headerDict),
//     };
//     return this.http.post<any>(this.baseurl + this.create_fav_url, body, {
//       headers: headerDict
//     });
//
//
//   }
//
//
// }
