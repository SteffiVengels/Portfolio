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

  showFeedback = false;     // Overlay sichtbar/nicht
  errorMessage = false;   

  constructor(public translate: TranslateService) { }

  handleFeedback(event: { success: boolean }) {
    this.showFeedback = true;
    this.errorMessage = !event.success;

    setTimeout(() => {
      this.showFeedback = false;
    }, 4500);
  }

  closeFeedback() {
    this.showFeedback = false;
  }


}
