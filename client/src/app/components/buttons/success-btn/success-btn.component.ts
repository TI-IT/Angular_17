import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-success-btn',
  standalone: true,
  imports: [],
  templateUrl: './success-btn.component.html',
  styleUrl: './success-btn.component.scss'
})
export class SuccessBtnComponent {
  @Input() btnData = {btnName: '', btnBoolean: false};
  @Output() emitSuccessBtnData = new EventEmitter;
  data = this.btnData.btnBoolean

  onClick(){
    this.btnData.btnBoolean = !this.btnData.btnBoolean;
    this.emitSuccessBtnData.emit(this.btnData.btnBoolean);

  }
}
