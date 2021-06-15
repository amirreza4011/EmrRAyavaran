import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './Config/configuration.service';
import namedata from 'assets/config/config.json';

@Injectable({
  providedIn: 'root'
})

// class for login
export class LoginServiceService {
   basurl: string;
  private  LoginUrl = '/api/Authenticate/login';
  private  confirl =   '/api/Hospital/ListOfConfigs';

  constructor(private http: HttpClient,
              private _Config: ConfigurationService
              ) {

  }
   seturl(url: any) {
    this.basurl = url;
   }
  // doctor login function
  doctor(username: string, password: string) {
    const data = {
      'username': username,
      'password': password,
      'type': '0',
    };
    const body = JSON.stringify(data );
    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.post<any>(this.basurl + this.LoginUrl, body, {
      headers: headerDict
    });


  }
  // user login function
  p_login(username: string, password: string, ) {

    const data = {
      'username': username,
      'password': password,
      'type': '1',
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };

      return   this.http.post<any>(this.basurl + this.LoginUrl, body, {
        headers: headerDict

      });




  }
  // conf
  getconfig() {
    const headerDict = {
      'Authorization': 'Bearer  ' + localStorage.getItem('token')
    }
    return this.http.get<any>(this.basurl + this.confirl,  {
      headers: headerDict
    })

  }
  create_user(item: any) {
    const r = item; // {'username': '3873282844351980' , 'password': '3873282844'}
    const data = {
      'setting_Key': 'Insurer_UserNameAndPassword_khadamateDarmani',
      'setting_Json': JSON.stringify(r[0])
    };
    const body = JSON.stringify(data );

    const headers = {  'Content-Type': 'application/json' };
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer  ' + localStorage.getItem('token'),
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return   this.http.post<any>(this.basurl + '/api/Setting/Set_User_Setting' , body, {
      headers: headerDict
    });


  }
}








