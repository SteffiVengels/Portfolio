import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() hideHeader = false;

  feedbackList = [
    {
      id: 1,
      name: 'A. Eigner',
      role: 'Team Partner',
    },
    {
      id: 2,
      name: 'K. Kukowin',
      role: 'Team Partner',
    },
    {
      id: 3,
      name: 'J. Katanek',
      role: 'Team Partner',
    },
    {
      id: 4,
      name: 'J. Flat',
      role: 'Team Partner',
    },
    {
      id: 5,
      name: 'K. Kukowin',
      role: 'Team Partner',
    },
    {
      id: 6,
      name: 'J. Katanek',
      role: 'Team Partner',
    },
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

private startX = 0;

onTouchStart(event: TouchEvent) {
  this.startX = event.touches[0].clientX;
}

onTouchEnd(event: TouchEvent) {
  const endX = event.changedTouches[0].clientX;
  const deltaX = this.startX - endX;

  if (deltaX > 50) {
    this.showNextFeedback(); // Swipe nach links → nächster Slide
  } else if (deltaX < -50) {
    this.showPreviousFeedback(); // Swipe nach rechts → vorheriger Slide
  }
}
}
