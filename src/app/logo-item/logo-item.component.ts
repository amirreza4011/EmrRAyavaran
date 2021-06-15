import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logo-item',
  templateUrl: './logo-item.component.html',
  styleUrls: ['./logo-item.component.scss']
})
export class LogoItemComponent implements OnInit {
  private title: any;
  @Input() public  show: boolean = true;
  constructor(
      private modalService: NgbModal

  ) { }
  GetDetails(content, titleText) {
    this.title = titleText;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
    });
  }

  ngOnInit() {
  }

}
