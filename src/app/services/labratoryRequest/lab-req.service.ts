import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import namedata from '../../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class LabReqService {
  private  servicurl =     '/api/Hospital/ListOfServiceGroup';
  private  saveurl =     '/api/Laboratory/Create_New_Order';
  private  listservicename =     '/api/Hospital/ListOfService';
  private  historylaburl =     '/api/Laboratory/Get_Last_History_Of_Observation';
  private  favlaburl =     '/api/Laboratory/Get_Practitioner_Laboratory_Favorite';
  private  favurl =     '/api/Laboratory/Create_New_Practitioner_Laboratory_Favorite';
  private  deletfavurl =     '/api/Laboratory/Delete_Practitioner_Laboratory_Favorite';
  private  getrequsthis =  '/api/Laboratory/Get_Laboratory_Order_Encounter';
  private  get_labhis_url =  '/api/Laboratory/Get_Laboratory_Order_Encounter';
  private  update_url =  '/api/Laboratory/Update_Laboratory_Order';

  baseurl: any;


  constructor( private  http: HttpClient) { }
  seturl(url: any) {
    this.baseurl = url;
  }
  servicename(): Observable<any> {
    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.get<any>(this.baseurl +  this.servicurl, {
      headers: headerDict
    });

  }
  getlabfav(): Observable<any> {
    const headerDict = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.get<any>(this.baseurl + this.favlaburl, {
      headers: headerDict
    });

  }
  favariteList(item: any): Observable <any> {
    const data = {
      'jsonValue': JSON.stringify(item),
    }
    const body = data;
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    console.log(body);
    return this.http.post<any>(this.baseurl + this.favurl, body, {
      headers: headerDict
    })
  }
  insertlab(list: any, encounterLocationID: any, type: any): Observable <any> {


    const data = {
      'encounterLocationID': encounterLocationID,
      'codeOf': '',
      'priorityIX': '0',
      'description': '0',
      'orderSheetGroup' : type,
      'orderevents': list,
      'jsonvalue': JSON.stringify(list)
    }
    const body = JSON.stringify(data );
    console.log(body)
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    console.log(body);
    return this.http.post<any>(this.baseurl + this.saveurl, body, {
      headers: headerDict
    })
  }
  getlistitem(id: any): Observable <any> {
    const data = {
      'serviceGroup': id,
    }
    const body = JSON.stringify(data );
    console.log(body)
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    console.log(body);
    return this.http.post<any>(this.baseurl + this.listservicename, body, {
      headers: headerDict
    })
  }
  deletfavlab(id: any): Observable <any> {
    const data = {
      'id': id,
    }
    const body = JSON.stringify(data );
    console.log(body)
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    console.log(body);
    return this.http.post<any>(this.baseurl + this.deletfavurl, body, {
      headers: headerDict
    })
  }
  gethistorylab(patientid: any, masterServcieID: any): Observable <any> {
    const data = {
      'patientid': patientid,
      'masterServcieID': masterServcieID
    }
    const body = JSON.stringify(data );
    console.log(body)
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    console.log(body);
    return this.http.post<any>(this.baseurl + this.historylaburl, body, {
      headers: headerDict
    })
  }
  gethistory_en(): Observable <any> {
    const data = {
      'encounterID': localStorage.getItem('encounterID'),
    }
    const body = JSON.stringify(data );
    console.log(body)
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    console.log(body);
    return this.http.post<any>(this.baseurl + this.getrequsthis, body, {
      headers: headerDict
    })
  }

  Get_Laboratory_Order_Encounter(customerobjElement: any) {

    const data = {
      'encounterLocationID': customerobjElement
    }
    const body = JSON.stringify(data );
    console.log(body)
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    console.log(body);
    return this.http.post<any>(this.baseurl + this.get_labhis_url, body, {
      headers: headerDict
    })
  }
    Update_Laboratory_Order(item: any) {
      const data = {
        'id': item['id'],
        'encounterLocationID': item['encounterLocationID'],
        'codeOf': '',
        'priorityIX': '',
        'statusIS': '',
        'description': '',
        'orderSheetGroup': '',
        'jsonValue': item['jsonValue'],
        'orderevents': item['orderevents']
      }
    const body = JSON.stringify(data );
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    console.log(body);
    return this.http.post<any>(this.baseurl + this.update_url, body, {
      headers: headerDict
    })
  }
}
