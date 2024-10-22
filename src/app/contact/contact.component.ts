import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';  // Import the emailjs library
declare var toastr: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  private serviceID = 'service_portfolio';
  private templateID = 'template_portfolio';
  private publicAPIKey = 'XxzkkyNxJGTGhGlqg';

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    const formValues = this.contactForm.value;
    console.log(formValues.name);
    console.log(formValues.email);
    console.log(formValues.message);
    
    emailjs.send(this.serviceID, this.templateID, {
      from_name: formValues.name,
      from_email: formValues.email,
      message: formValues.message,
      to_name: 'Nirmal Israel' // Replace with actual recipient name or pass it dynamically
    }, this.publicAPIKey)
    .then((result) => {
      this.successMessage = 'Message sent successfully!';
      toastr.success('Email sent successfully!');
      this.contactForm.reset();
      this.submitted = false;
    }, (error) => {
      this.errorMessage = 'Failed to send message. Please try again later.';
      toastr.error('Failed to send email.');
    });
  }
}
