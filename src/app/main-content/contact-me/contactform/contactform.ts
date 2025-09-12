import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslatePipe],
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

  constructor(public translate: TranslateService) { }

  mailTest = false;
  showFeedback = false;
  errorMessage = false;

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
            this.showSuccessMessage(ngForm);
          },
          error: (error) => {
            this.showErrorMessage(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }

  showSuccessMessage(ngForm: NgForm) {
    this.errorMessage = false; // Erfolg
    this.showFeedback = true;
    ngForm.resetForm();
    this.autoHideFeedback();
  }

  showErrorMessage(error: any) {
    this.errorMessage = true; // Fehler
    this.showFeedback = true;
    this.autoHideFeedback();
    console.error(error);
  }

  autoHideFeedback() {
    setTimeout(() => {
      this.showFeedback = false;
    }, 4500); // nach 5 Sekunden ausblenden
  }

  closeFeedback() {
    this.showFeedback = false;
  }
}
