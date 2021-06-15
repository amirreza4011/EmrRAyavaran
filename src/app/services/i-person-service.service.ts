import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPerson} from './../DTO/iPerson'
import {Observable} from 'rxjs';
import {Ireq} from './../DTO/ireq'
import {isObservable} from 'rxjs/internal-compatibility';
import namedata from '../../assets/config/config.json';


@Injectable({
  providedIn: 'root'
})
export class IPersonServiceService {
    private userUrl =     '/api/Laboratory/Laboratory_Encounter';
     baseurl: any;
    constructor( private http: HttpClient ) { }
    seturl(url: any) {
        this.baseurl = url;
    }
      // is fun for get usherette
       getData(): Observable<any> {
        const headerDict = {
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        }
        const requestOptions = {
            headers: new Headers(headerDict),
        };
       console.log(headerDict)
        return   this.http.get<any>(this.baseurl + this.userUrl, {
            headers: headerDict
        });
       }



}
