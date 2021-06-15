import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {json} from 'ng2-validation/dist/json';
import {tap} from 'rxjs/operators';
import namedata from 'assets/config/config.json';
import {number} from 'ng2-validation/dist/number';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionServicesService {
    baseurl: string;
    urlsepas: string;
  private Url = '/api/DrugStore/Get_PharmacyList';
  private Urldrug =      '/api/DrugStore/Get_SalableList';
  private Urlinsert =      '/api/DrugStore/Create_New_WardRequest';
  private favUrl =     '/api/DrugStore/Create_New_Practitioner_Drug_Favorite';
  private getFavUrl =     '/api/DrugStore/Get_Practitioner_Drug_Favorite';
  private getdetail =     '/api/EMR/Get_Encounter';
    private getpacage =     '/api/DrugStore/Get_Packaging';
    private routelisturl =     '/api/DrugStore/Get_RouteUsageList';
    private frequncylisturl =     '/api/DrugStore/Get_FrequencyUsageList';
    private chronicurl =     '/api/DrugStore/Create_New_Patient_Drug_Chronic';
    private favdeleteurl =      '/api/DrugStore/Delete_Practitioner_Drug_Favorite';
    private erxurl =      '/api/DrugStore/Get_Sepas_ERX_List';
    private getlistdru = '/api/DrugStore/Get_Web_API_Drug_Requset';
    private editsaveurl = '/api/DrugStore/Update_WardRequest';
    private sepasurl = 'http://rw35:8090/rwsepas02/api/Prescription/getInsertSimplePrescription';

    constructor(private http: HttpClient) { }
    setMyGV(url: any) {
        this.baseurl = url;
    }
    set_sepas(url: any) {
        this.urlsepas = url;
    }
 getService(): Observable <any> {

   const headerDict = {

     'Authorization': 'Bearer  ' + localStorage.getItem('token'),
   }
   return this.http.get<any>(this.baseurl + this.Url, {
     headers: headerDict
 })
}
    getdruglist(id: any): Observable <any> {
        const data = {
            'deptID': id
        };
        const body = JSON.stringify(data );
        const headerDict = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        return this.http.post<any>(this.baseurl + this.Urldrug, body, {
            headers: headerDict
        })
    }
    sendsepas(listitem: any , en_id: any , doc_id: any ): Observable <any> {
        const data = {
            'EncounterID': en_id,
            'PractitionerID': doc_id,
            'ExpireDateTime': '2021-02-20T10:41:32.7587546+03:30',
            'IssueDateTime': '2021-02-20T10:41:32.7587546+03:30',
            'lstOrder': listitem
        };

        const body = JSON.stringify(data );
        console.log('sepas', body);
        const headerDict = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200/',
            'Access-Control-Allow-Headers' : 'Content-Type',
            'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
            'X-Powered-By' : 'ASP.NET',
            'X-AspNet-Version' : '4.0.30319',
        }
        return this.http.post<any>( this.urlsepas, body, {
            headers: headerDict
        })
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
        return this.http.post<any>(this.baseurl + this.favUrl, body, {
            headers: headerDict
        })
    }
    savechronic(item: any, pid: string): Observable <any> {
        const data = {
            'patientID': pid,
            'jsonValue': JSON.stringify(item),
        }
        const body = data;
        const headerDict = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        console.log(body);
        return this.http.post<any>(this.baseurl + this.chronicurl, body, {
            headers: headerDict
        })
    }
    getFavList() {
        const headerDict = {
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        return this.http.get<any>(this.baseurl + this.getFavUrl,  {
            headers: headerDict
        })

    }
    geterxdrug() {
        const headerDict = {
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        return this.http.get<any>(this.baseurl + this.erxurl,  {
            headers: headerDict
        })

    }
    getpac() {
        const headerDict = {
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        return this.http.get<any>(this.baseurl + this.getpacage,  {
            headers: headerDict
        })

    }
    routelist() {
        const headerDict = {
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        return this.http.get<any>(this.baseurl + this.routelisturl,  {
            headers: headerDict
        })

    }
    frequncylist() {
        const headerDict = {
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        return this.http.get<any>(this.baseurl + this.frequncylisturl,  {
            headers: headerDict
        })

    }

    getdetail1(): Observable <any> {
        const data = {
            'encounterID': localStorage.getItem('encounterID')
        };
        const body = JSON.stringify(data );
        const headerDict = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        return this.http.post<any>(this.baseurl + this.getdetail, body, {
            headers: headerDict
        })
    }
    inserdruglist(fierstlist: any, list: any, wardLocID: string, phar: string): Observable <any> {
        console.log(list);
        const data = {
            'wardLocID': wardLocID,
            'pharmacyID': phar,
            'encountrID': localStorage.getItem('encounterID'),
            'reqPriorIX': '0',
            'wardRequestItems': list,
            'jsonValue': JSON.stringify(fierstlist)
        }
      const o =  {
            'id': 0,
            'encounterID': Number(localStorage.getItem('encounterID')),
            'practitionerID': '',
            'requestDate': '',
            'jsonValue': JSON.stringify(fierstlist).toString(),
            'rayavaran_WardRequest_Status_Code': '',
            'expiryDate': '1400-06-01',
            'repeats': 1,
            'web_API_Drug_Requset_Items':list


        }
        const body = JSON.stringify(o );

       console.log(body);
        const headerDict = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        return this.http.post<any>(this.baseurl + this.Urlinsert, body, {
            headers: headerDict
        })
    }
    save_edite_drug(fierstlist: any): Observable <any> {

        const data = {

            'id': fierstlist['id'],
            'rayavaran_WardRequest_ID': fierstlist['rayavaran_WardRequest_ID'],
            'wardRequestItems': fierstlist['wardRequestItems'],
            'jsonValue': fierstlist['jsonValue']
        }
        const body = JSON.stringify(data );
        console.log('bodddddd', body);

        const headerDict = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer  ' + localStorage.getItem('token')
        }
        return this.http.post<any>(this.baseurl + this.editsaveurl, body, {
            headers: headerDict
        })
    }
    deletefav(id: string) {

        const data = {
            'id': id
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

        return   this.http.post<any>(this.baseurl + this.favdeleteurl, body, {
            headers: headerDict
        });


    }
    getlistdrug(id: any) {

        const data = {
            'encounterID': id
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

        return   this.http.post<any>(this.baseurl + this.getlistdru, body, {
            headers: headerDict
        });


    }

}
