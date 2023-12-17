import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { timeValidator } from '../shared/time-validator.directive';
import { phoneNumberValidator } from '../shared/phone-number-validator.directive';
import { DataService } from '../data.service';

/**
 * EditFormComponent
 *
 * This component provides a form for editing data items. It uses a reactive form
 * approach, with form controls for each field of the data item. The form includes
 * validation, with error messages displayed for invalid fields.
 *
 * When the form is submitted, the component calls a method on a data service to
 * update the data item. If the update is successful, the component emits a 'close'
 * event to notify the parent component that the form should be closed.
 *
 * The component also provides a method to close the form without submitting any
 * changes. This method also emits the 'close' event.
 */

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  @Input() id!: number;
  @Output() close = new EventEmitter<void>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const data = this.dataService.getData(this.id);
    if (data) {
      this.profileForm = new FormGroup({
        firstName: new FormControl(data.firstName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
          forbiddenNameValidator(/^frank$/i), // Frank is not welcome to the party
        ]),
        lastName: new FormControl(data.lastName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ]),
        phoneNumber: new FormControl(data.phoneNumber, [
          Validators.required,
          phoneNumberValidator,
        ]),
        arrivalTime: new FormControl(data.arrivalTime, [
          Validators.required,
          timeValidator,
        ]),
      });
    }
  }

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    arrivalTime: new FormControl(''),
  });

  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }
  get arrivalTime() {
    return this.profileForm.get('arrivalTime');
  }

  objectKeys = Object.keys;

  errorMessages: { [key: string]: string } = {
    required: 'This field is required.',
    minlength: 'This field must be at least 2 characters long.',
    maxlength: 'This field cannot be more than 25 characters long.',
    forbiddenName: 'This name is not allowed.',
    invalidPhoneNumber: 'This phone number is invalid.',
  };

  onSubmit() {
    if (this.profileForm.valid) {
      this.dataService
        .updateData(this.id, this.profileForm.value)
        .then(() => {
          // After the data has been updated, emit the close event.
          this.close.emit();
        })
        .catch((error) => {
          // Handle any errors that occurred while updating the data.
          console.error('Error updating data:', error);
        });
    }
  }

  onClose() {
    this.close.emit();
  }
}
