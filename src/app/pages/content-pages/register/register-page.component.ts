import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {ITo, ITodo, TodoState} from '../../../states/todo-state';
import {Observable, Subscription} from 'rxjs';
import {TodoActions} from '../../../states/todo-actions';
import AddTo = TodoActions.AddTo;
import {Customer} from '../../../core/store/customer';
import {CustomersService} from '../../../core/store/customers.service';

const  g: ITo = {
    id: '8787',
    state: '34',
};
@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
    @ViewChild('f', {static: false}) registerForm: NgForm;
    customers: Customer;
    stateHistory = null;
    isHistoryVisible = false;
    subs = new Subscription();
    constructor(private customersService: CustomersService) {
    }
    //  On submit click, reset field value
    onSubmit() {
        this.registerForm.reset();
    }
    ngOnInit(): void {
        this.subs.add(this.customersService.stateChanged.subscribe(state => {
            if (state) {
                this.customers = state.customer;
            }
        }));
    }
}
