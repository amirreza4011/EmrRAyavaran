import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { GetAll} from './../DTO/getAll' ;
import namedata from 'assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class GetAllService {
  private url =     '/api/Laboratory/Laboratory_Request';
  private urlradio =     '/api/Radiology/Get_My_Radiology_Result';
  baseurl: any;

  constructor(private http: HttpClient) { }
  seturl(url: any) {
    this.baseurl = url;
  }
  getAll( ): Observable <any> {
    const headerDict = {
      'Authorization': 'Bearer  ' + localStorage.getItem('userToken')
    }
    return this.http.get<any>(this.baseurl + this.url, {
      headers: headerDict
    });

  }
  getradio( ): Observable <any> {
    const headerDict = {
      'Authorization': 'Bearer  ' + localStorage.getItem('userToken')
    }
    return this.http.get<any>(this.baseurl + this.urlradio, {
      headers: headerDict
    });

  }
  // getradio() {
  //   const data = {
  //     'encounterID': localStorage.getItem('encounterid'),
  //   };
  //   const body = JSON.stringify(data );
  //   const headers = {  'Content-Type': 'application/json' };
  //   const headerDict = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer  ' + localStorage.getItem('userToken')
  //   }
  //
  //   const requestOptions = {
  //     headers: new Headers(headerDict),
  //   };
  //   return this.http.post<any>(this.urlradio, body, {
  //     headers: headerDict
  //   });
  //
  //
  // }


}
