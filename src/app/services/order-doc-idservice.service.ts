import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IUser} from './../DTO/iUser';
import { Observable } from 'rxjs';
import {number} from 'ng2-validation/dist/number';

@Injectable({
  providedIn: 'root'
})
export class OrderDocIDServiceService {
  private url: string = 'http://172.22.196.0:8084/api/Laboratory_Test';

  constructor( private http: HttpClient) { }


  getTest(orderDocID: number ): Observable<IUser[]> {
    const urlId = `${this.url}/${orderDocID}`;

    return this.http.get<IUser[]>(urlId);
  }


}
