import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './references.html',
  styleUrl: './references.scss'
})
export class References {

  feedbackList = [
    {
      id: 1,
      name: 'H. Janisch',
      role: 'Team Partner',
    },
    {
      id: 2,
      name: 'A. Fischer',
      role: 'Team Partner',
    },
    {
      id: 3,
      name: 'T. Schulz',
      role: 'Frontend Developer',
    }
  ];

  constructor(public translate: TranslateService) {
  }

  currentFeedbackIndex = 0;

  showNextFeedback() {
    this.currentFeedbackIndex = (this.currentFeedbackIndex + 1) % this.feedbackList.length;
  }
  showPreviousFeedback() {
    this.currentFeedbackIndex = (this.currentFeedbackIndex - 1 + this.feedbackList.length) % this.feedbackList.length;
  }

  getVisibleFeedback() {
    const prevIndex = (this.currentFeedbackIndex - 1 + this.feedbackList.length) % this.feedbackList.length;
    const nextIndex = (this.currentFeedbackIndex + 1) % this.feedbackList.length;

    return [
      this.feedbackList[prevIndex],
      this.feedbackList[this.currentFeedbackIndex],
      this.feedbackList[nextIndex]
    ];
  }
}
