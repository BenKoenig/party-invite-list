import { Component, Output, Input, EventEmitter } from '@angular/core';

/**
 * ButtonComponent
 *
 * This component represents a reusable button that can be used throughout the application.
 * It encapsulates the button's behavior and styles, providing a consistent look and feel.
 *
 * The `onClick` method is triggered when the button is clicked. This method can be overridden
 * or extended in subclasses or in components that use the `ButtonComponent` to provide custom
 * behavior when the button is clicked.
 */

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