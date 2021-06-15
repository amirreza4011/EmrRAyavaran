import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable} from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private showSlideBar: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }
  public getSlider(): Observable<any> {
    return this.showSlideBar;
}
  public  setSlider(page:any) {
    this.showSlideBar.next(page);
  }

}


