import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginServiceService} from '../../services/login-service.service';
import {SalamatserviceService} from '../../services/salamatservice.service';
import {ApiconfigserviceService} from '../../service/apiconfigservice.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  signupForm: FormGroup;
  datafinal: Array<any> = [];
   res: any;
  constructor(
      private router: Router,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private _service: LoginServiceService,
      private  _salamatservice: SalamatserviceService ,
      private  i: ApiconfigserviceService
  ) {
    this._service.seturl(this.i.config.API_URL);
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      'username': ['', Validators.required ],
      'password': ['', Validators.required ],
    })
    }
  onSubmit() {
    console.log(this.signupForm.value);
    const data = {
      'username': this.signupForm.value.username,
      'password': this.signupForm.value.password,

    };
    this.datafinal.push(data);
    this._service.create_user(this.datafinal).subscribe( p => {
      if (p['success'] == true) {
        this.res = 'اطلاعات در سامانه ثبت شد';
      }

    })
  }
}
