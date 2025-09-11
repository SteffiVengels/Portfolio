import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contactform.html',
  styleUrl: './contactform.scss'
})
export class Contactform {

  contactData = {
    name: '',
    email: '',
    message: ''
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log('Form submitted:', this.contactData);
    }
  }

}
