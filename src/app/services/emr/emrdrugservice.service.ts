import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import namedata from '../../../assets/config/config.json';
import {SalamatserviceService} from '../salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';


@Injectable({
  providedIn: 'root'
})
export class EmrdrugserviceService {
  private url =     '/api/DrugStore/Get_HistoryofPrescriptions';
  private urldetail =     '/api/DrugStore/Get_HistoryofPrescriptionItems';
  private testlisturl =     '/api/Laboratory/Get_HistoryofLaboratory';
  private obser =     '/api/EMR/Get_Diagnosis_Patient_History';

  basurl: any;

  constructor(
      private http: HttpClient ,
      private  i: ApiconfigserviceService
  ) {

  }
  seturl(url: any) {
    this.basurl = url;
  }
  getgrughistory(pationid: any) {
    const data = {
      'patientID': pationid,
    };
    const body = JSON.stringify(data );
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post<any>(this.basurl + this.url, body, {
      headers: headerDict
    });


  }
  observation_get(pationid: any) {
    const data = {
      'patientID': pationid,
    };
    const body = JSON.stringify(data );
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post<any>(this.basurl + this.obser, body, {
      headers: headerDict
    });


  }
  getdetail(id: any) {
    const data = {
      'prescriptionID': id,
    };
    const body = JSON.stringify(data );
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post<any>(this.basurl + this.urldetail, body, {
      headers: headerDict
    });
  }
   gettestlist(id: any) {
    const data = {
      'encounterId': localStorage.getItem('encounterID'),
    };
    const body = JSON.stringify(data );
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post<any>(this.basurl + this.testlisturl, body, {
      headers: headerDict
    });
  }
}
