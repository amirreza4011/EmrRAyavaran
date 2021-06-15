import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITest} from './../DTO/iTest';


@Injectable({
  providedIn: 'root'
})
export class LabratoryTestServiceService {
  getlabratoryTest(): Observable <ITest[]> {
   return  this.http.get<ITest[]>('http://172.22.196.3:8084/api/Laboratory_Test/')
  }
  constructor( private http: HttpClient) { }
}
