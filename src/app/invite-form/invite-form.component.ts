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
  // Dependency injection of DataService for handling data operations
  constructor(private dataService: DataService) {}

  // Lifecycle hook that gets called after component initialization
  ngOnInit(): void {
    // Initializes the form with validation rules
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required, // First name is required
        Validators.minLength(2), // Minimum length of 2 characters
        Validators.maxLength(25), // Maximum length of 25 characters
        forbiddenNameValidator(/^frank$/i), // Custom validator to forbid the name "Frank"
      ]),
      lastName: new FormControl('', [
        Validators.required, // Last name is required
        Validators.minLength(2), // Minimum length of 2 characters
        Validators.maxLength(25), // Maximum length of 25 characters
      ]),
      phoneNumber: new FormControl('', [
        Validators.required, // Phone number is required
        phoneNumberValidator, // Custom phone number validator
      ]),
      arrivalTime: new FormControl('', [
        Validators.required, // Arrival time is required
        timeValidator, // Custom time validator
      ]),
    });
  }

  // Redundant form group initialization - this should be removed
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    arrivalTime: new FormControl(''),
  });

  // Getter methods to access form controls easily in the template
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

  // Helper method to return object keys
  objectKeys = Object.keys;

  // Object containing error messages for different validation errors
  errorMessages: { [key: string]: string } = {
    required: 'This field is required.',
    minlength: 'This field must be at least 2 characters long.',
    maxlength: 'This field cannot be more than 25 characters long.',
    forbiddenName: 'This name is not allowed.',
    invalidPhoneNumber: 'This phone number is invalid.',
  };

  // Method to handle form submission
  onSubmit() {
    const id = uuidv4(); // Generates a unique ID
    const formValues = this.profileForm.value; // Gets form values
    const dataWithId = { ...formValues, id }; // Adds the unique ID to the form data
    this.dataService.addData(dataWithId); // Sends data to the DataService
    this.profileForm.reset(); // Resets the form after submission
  }
}
