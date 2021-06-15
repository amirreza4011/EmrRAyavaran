import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import namedata from '../../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})

export class DrugRecordService {
  private urlDrugRec =     '/api/DrugStore/Get_HistoryofPrescriptions';
  private  urlDrugItem =     '/api/DrugStore/Get_HistoryofPrescriptionItems';


  constructor( private  http: HttpClient) { }
  getDrugRec(): Observable <any> {
    const data = {
      'encounterId':  localStorage.getItem('encounterID')
    };
    const body = JSON.stringify(data );
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token'),
    }

    return this.http.post<any>(this.urlDrugRec, body, {
      headers: headerDict
    });
  }
  getDurgItem( id): Observable <any> {
    const data = {
      'prescriptionID': id
    };
    const body = JSON.stringify(data );
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token'),
    }

    return this.http.post<any>(this.urlDrugItem, body, {
      headers: headerDict
    });

  }



}

