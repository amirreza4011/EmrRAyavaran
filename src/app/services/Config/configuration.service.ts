import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import namedata from '../assets/demo.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
     url = '';


  constructor(private http: HttpClient) { }
    getdata() {
      const file = '';

      return 'hjkdb'
    }
}
