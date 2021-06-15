import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {json} from 'ng2-validation/dist/json';

@Injectable({
  providedIn: 'root'
})
export class ProfileseviceService {
  baseurl: any;
  create_fav_url = '/api/Setting/Create_Practitioner_Order_Favorite';
  get_fav_url    = '/api/Setting/Get_Practitioner_Order_Favorite';
  delet_fav_url  = '/api/Setting/Delete_Practitioner_Order_Favorite';
  Add_fav_url    = '/api/Setting/Add_Practitioner_Order_Favorite_Items';

  constructor(private http: HttpClient) { }
  seturl(url: any) {
    this.baseurl = url;
  }
  create_fav(name: string, id: number) {
    const data = {
      'orderGroup': id.toString(),
      'favoriteName': name
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
    return this.http.post<any>(this.baseurl + this.create_fav_url, body, {
      headers: headerDict
    });
  }
  gae_fav(id: number) {
    const data = {
      'orderGroup': id.toString(),
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
    return this.http.post<any>(this.baseurl + this.get_fav_url, body, {
      headers: headerDict
    });
  }
  delet_fav(id: any) {
    const data = {
      'id': id.toString(),
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
    return this.http.post<any>(this.baseurl + this.delet_fav_url, body, {
      headers: headerDict
    });
  }
  Add_fav(id: any , item : any) {
    const data = {
      'id': id.toString(),
      'jsonValue': JSON.stringify(item)
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
    return this.http.post<any>(this.baseurl + this.Add_fav_url, body, {
      headers: headerDict
    });
  }
}
