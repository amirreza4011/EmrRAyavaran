import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import namedata from 'assets/config/config.json';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private hospitalUrl =  '/api/Hospital/HospitalInformation ';
  private visiturl    =  '/api/EMR/Set_Encounter_Visited_Status';

  tok = '';
  baseurl: any;
  constructor(private http: HttpClient) { }
  setMyGV(url: any) {
    this.baseurl = url;
  }
  getAll( ): Observable <any> {
    if (localStorage.getItem('token') == null ) {
       this.tok = localStorage.getItem('userToken');
    } else {
      this.tok = localStorage.getItem('token');

    }
    const headerDict = {
      // tslint:disable-next-line:max-line-length
      'Authorization': 'Bearer  ' +  this.tok,
    }

    return this.http.get<any>(this.baseurl + this.hospitalUrl, {
      headers: headerDict
    });

  }
  setvisit(): Observable <any> {
    const data = {
      'encounterID': localStorage.getItem('encounterID'),
      'visitedStatus': '1'
    };
    const body = JSON.stringify(data );

    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    return this.http.post<any>(this.baseurl + this.visiturl, body, {
      headers: headerDict
    })
  }
}


