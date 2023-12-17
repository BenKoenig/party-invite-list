import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() backgroundColor: string = '#f38d8d';
  @Output() onClick = new EventEmitter<void | number>();

  handleClick() {
    this.onClick.emit();
  }


}