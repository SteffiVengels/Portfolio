import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
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

  @Output() feedback = new EventEmitter<{ success: boolean }>();

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacy: false
  }

  constructor(public translate: TranslateService) { }

  mailTest = false;
  showFeedback = true;
  errorMessage = false;

  
  /**
   * Configuration object for sending form data to the backend.
   */
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


    /**
   * Handles form submission.  
   * If the form is valid and not in test mode, it sends the data to the backend.  
   * Emits feedback about success or error state.
   * 
   * @param ngForm - Angular form instance containing validation state and data.
   */
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.feedback.emit({ success: true });
            ngForm.resetForm();
          },
          error: (error) => {
            this.feedback.emit({ success: false });
            console.error(error);
          }
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
      this.feedback.emit({ success: true });
    }
  }
}
