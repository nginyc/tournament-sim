import { EventEmitter, Input, Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  _title = '';
  _message = '';

  @Output()
  onConfirmEvent = new EventEmitter();

  @Output()
  onCancelEvent = new EventEmitter();

  $modal;

  constructor() { }

  ngOnInit() {
    this.$modal = window['$']('app-confirmation-modal>.modal');
  }

  _onConfirm($event) {
    this.onConfirmEvent.emit({});
  }

  show(title: string, message: string) {
    this._title = title;
    this._message = message;
    this.$modal.modal('show');
  }

  hide() {
    this.$modal.modal('hide');
  }

  _onCancel($event) {
    this.onCancelEvent.emit({});
  }
}
