import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { timeValidator } from '../shared/time-validator.directive';
import { phoneNumberValidator } from '../shared/phone-number-validator.directive';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from '../data.service';

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
    const formValues = this.profileForm.value;
    this.dataService.editData(this.id, formValues);
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
