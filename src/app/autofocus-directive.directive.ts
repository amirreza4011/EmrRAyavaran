import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[myAutofocus]'
})
export class AutofocusDirectiveDirective implements OnInit {

  constructor(private elementRef: ElementRef) { };

  ngOnInit(): void {
    alert('hgjhk')
    this.elementRef.nativeElement.focus();
  }

}
