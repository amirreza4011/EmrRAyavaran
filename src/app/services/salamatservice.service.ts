import { Injectable } from '@angular/core';
import namedata from '../../assets/config/config.json';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './Config/configuration.service';
import {ApiconfigserviceService} from '../service/apiconfigservice.service';

@Injectable({
  providedIn: 'root'
})
export class SalamatserviceService {
  basurl: string;
  private urlagenttoken =     '/Agent_gettoken';
  private userurltoken =      '/Get_usertoken?id=';
  private citizenurl =        '/citizen_gettoken';
  private samadcode =         '/samad_code';
  private detailnosurl =      '/get_detail_noskhe';
  private detailnosurldrug =  '/get_detail_noskhe_drug';
  private save =              '/save_service';

  constructor(private http: HttpClient,
              private _Config: ConfigurationService,
              private  i: ApiconfigserviceService

  ) {

  }
  seturl(url: any) {
    this.basurl = url;
  }
  // agent api
  getsalamatagenttoken( ) {

    const data = {
      'terminalId': 192604,
      'username': 'HDK_rayavaran_test',
      'password': '9123714903'
    };
    const body = JSON.stringify(data );
    const headerDict = {
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.get<any>(this.basurl +  this.urlagenttoken, {
      headers: headerDict
    });


  }
  // user api
  getsalamtusertoken( id: any) {

    const data = {
        'id': localStorage.getItem('salamattoken'),
        'username': localStorage.getItem('user'),
        'password': localStorage.getItem('pass')
    };

    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'terminalId': '368279',
      'token' : '',
      'clientIPAddress' : '',
      'clientAgentInfo' : '',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.basurl + this.userurltoken , body , {
      headers: headerDict
    });


  }
  getcitizentoken(token: any , sessionsid: any , national_code: string ) {

    const data = {

        'token': token,
        'sessionsid': sessionsid,
        'citizen': '',
        'samad': '',
        'chek': null,
        'national_code': national_code
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.basurl +  this.citizenurl , body, {
       headers: headerDict
    });


  }
  getsamadcode(token: any , sessionsid: any , citizenid: string ) {

    const data = {

      'token': token,
      'sessionsid': sessionsid,
      'citizen': citizenid,
      'samad': '',
      'chek': null,
      'national_code': ''
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.basurl +  this.samadcode , body, {
      headers: headerDict
    });


  }
  getdetailnoskhe(token: any , sessionsid: any , citizenid: string , samad: string, item: any) {
    const data = {
      'token': token,
      'sessionsid': sessionsid,
      'citizen': citizenid,
      'samad': samad,
      'chek': null,
      'national_code': '',
      'consumption': item['Frequencyid'],
      'consumptionInstruction': item['dosetxt'] + ' ' + item['dosesel'],
      'count': item['qty'],
      'description': item['Directions'],
      'nationalNumber': item['drugid'], // item['generic_Code'],
      'numberOfPeriod': 1
    };
   console.log('tab:' , item['drugname'].includes('TABLET'))
    if (item['drugname'].includes('TABLET') || item['drugname'].includes('INJECTION') || item['drugname'].includes('CREAM')  ) {
      data['consumptionInstruction'] = null;
    }
    const body = JSON.stringify(data );
    console.log('body:', body)
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.basurl +  this.detailnosurldrug , body, {
      headers: headerDict
    });


  }
  getdetailtest(token: any , sessionsid: any , citizenid: string , samad: string, item: any) {

    const data = {

      'token': token,
      'sessionsid': sessionsid,
      'citizen': citizenid,
      'samad': samad,
      'chek': null,
      'national_code': '',
      'consumption': '',
      'consumptionInstruction': '',
      'count': 1,
      'description': '',
      'nationalNumber': item,
      'numberOfPeriod': 0
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.basurl +  this.detailnosurl , body, {
      headers: headerDict
    });


  }
  save_no(token: any , sessionsid: any , citizenid: string , samad: string, item: any) {

    const data = {

      'token': token,
      'sessionsid': sessionsid,
      'citizen': citizenid,
      'samad': samad,
      'chek': item,
      'national_code': '',
      'consumption': '',
      'consumptionInstruction': '',
      'count': 1,
      'description': '',
      'nationalNumber': '',
      'numberOfPeriod': 0
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.basurl +  this.save , body, {
      headers: headerDict
    });


  }

}
