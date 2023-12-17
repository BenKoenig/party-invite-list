import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { timeValidator } from '../shared/time-validator.directive';
import { phoneNumberValidator } from '../shared/phone-number-validator.directive';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from '../data.service';

/**
 * InviteFormComponent is a component that handles the invitation list.
 * It includes a form (profileForm) for adding new invitees to the list.
 * The form includes fields for the invitee's first name, last name, phone number, and arrival time.
 * Each field includes validation to ensure that the user input is valid.
 * For example, the first name and last name fields require the name to be between 2 and 25 characters long.
 * The phone number field uses a custom validator to check that the phone number includes a country code and is the correct length.
 * The arrival time field uses a custom validator to check that the time is in 24-hour format.
 */

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrls: ['./invite-form.component.scss'],
})
export class InviteFormComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
        forbiddenNameValidator(/^frank$/i), // Frank is not welcome to the party
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        phoneNumberValidator,
      ]),
      arrivalTime: new FormControl('', [Validators.required, timeValidator]),
    });
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
    const id = uuidv4(); // generates a unique id
    const formValues = this.profileForm.value;
    const dataWithId = { ...formValues, id }; // adds the id to the form data
    this.dataService.addData(dataWithId);
    this.profileForm.reset();
  }
}