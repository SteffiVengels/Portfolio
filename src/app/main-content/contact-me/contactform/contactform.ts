import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contactform.html',
  styleUrl: './contactform.scss'
})
export class Contactform {

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false
  }

  mailTest = false;
  successMessage = '';
  errorMessage = '';
  showFeedback = false;

private hideTimeout: any;

showMessage(type: 'success' | 'error', text: string) {
  clearTimeout(this.hideTimeout); // evtl. alte Timer löschen

  if (type === 'success') {
    this.successMessage = text;
    this.errorMessage = '';
  } else {
    this.errorMessage = text;
    this.successMessage = '';
  }

  this.showFeedback = true;

  this.hideTimeout = setTimeout(() => {
    this.showFeedback = false;
  }, 3000); // 5 Sekunden sichtbar
}

  post = {
    endPoint: 'https://stefanie-vengels.dev/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.showMessage('success', 'Danke! Deine Nachricht wurde erfolgreich gesendet.');
            ngForm.resetForm();
          },
          error: (error) => {
            this.showMessage('error', 'Ups, da ist etwas schiefgelaufen. Bitte versuch es später erneut.');
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {

      ngForm.resetForm();
    }
  }
}
