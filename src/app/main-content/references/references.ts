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
    },
    {
      id: 4,
      name: 'H. Janisch',
      role: 'Team Partner',
    },
    {
      id: 5,
      name: 'A. Fischer',
      role: 'Team Partner',
    },
    {
      id: 6,
      name: 'T. Schulz',
      role: 'Frontend Developer',
    }
  ];

  constructor(public translate: TranslateService) {
  }

currentFeedbackIndex = 0;
slideDirection: 'next' | 'prev' = 'next';

showNextFeedback() {
  this.slideDirection = 'next';
  this.currentFeedbackIndex = (this.currentFeedbackIndex + 1) % this.feedbackList.length;
}

showPreviousFeedback() {
  this.slideDirection = 'prev';
  this.currentFeedbackIndex =
    (this.currentFeedbackIndex - 1 + this.feedbackList.length) % this.feedbackList.length;
}

/**
 * Gibt die Klasse für jede Karte zurück:
 * - active → Mitte
 * - prev1 / prev2 → links
 * - next1 / next2 → rechts
 * - hidden → alle anderen
 */
getCardClass(index: number): string {
  const length = this.feedbackList.length;
  
  const prev1 = (this.currentFeedbackIndex - 1 + length) % length;
  const prev2 = (this.currentFeedbackIndex - 2 + length) % length;
  const next1 = (this.currentFeedbackIndex + 1) % length;
  const next2 = (this.currentFeedbackIndex + 2) % length;

  if (index === this.currentFeedbackIndex) return 'active';
  if (index === prev1) return 'prev1';
  if (index === prev2) return 'prev2';
  if (index === next1) return 'next1';
  if (index === next2) return 'next2';
  return 'hidden';
}
}
