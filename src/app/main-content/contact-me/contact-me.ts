import { Component } from '@angular/core';
import { Contactform } from './contactform/contactform';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [Contactform, TranslatePipe, FormsModule, CommonModule],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss'
})
export class ContactMe {

  /**
   * Controls whether the feedback message is visible.
   */
  showFeedback = false;

  /**
   * Indicates if the last feedback message represents an error.
   */
  errorMessage = false;

  
  constructor(public translate: TranslateService) { }


  /**
 * Handles the feedback event from the contact form.
 * Shows feedback and toggles error state depending on success.
 * 
 * @param event - The result object containing a success flag.
 */
  handleFeedback(event: { success: boolean }) {
    this.showFeedback = true;
    this.errorMessage = !event.success;

    setTimeout(() => {
      this.showFeedback = false;
    }, 4500);
  }


  /**
   * Closes the feedback message manually.
   */
  closeFeedback() {
    this.showFeedback = false;
  }
}
