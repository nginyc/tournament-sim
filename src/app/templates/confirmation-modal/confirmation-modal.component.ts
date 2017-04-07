import { OnChanges, EventEmitter, Input, Component, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit, OnChanges {

  @Input()
  title: string;

  @Input()
  message: string;

  @Input()
  isShown: boolean;

  @Output()
  onConfirmEvent = new EventEmitter();

  @Output()
  onCancelEvent = new EventEmitter();

  $modal;

  constructor() { }

  ngOnInit() {
    this.$modal = window['$']('confirmation-modal>.modal');
    this.updateModal();
  }

  onConfirm($event) {
    this.onConfirmEvent.emit({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isShown && !changes.isShown.firstChange) {
      this.updateModal();
    }
  }

  updateModal() {
    // Show/hide modal depending on value of isShown
    if (this.isShown) {
      this.$modal.modal('show');
    } else {
      this.$modal.modal('hide');
    }
  }

  onCancel($event) {
    this.onCancelEvent.emit({});
  }
}
