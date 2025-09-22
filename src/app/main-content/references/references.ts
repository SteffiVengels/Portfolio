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
  private startX = 0;
  currentFeedbackIndex = 0;
  slideDirection: 'next' | 'prev' = 'next';

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
      name: 'S. Ebert',
      role: 'Team Partner',
    }
  ];


  constructor(public translate: TranslateService) { }


  /**
    * Shows the next feedback in the carousel and sets slide direction to 'next'.
    */
  showNextFeedback() {
    this.slideDirection = 'next';
    this.currentFeedbackIndex = (this.currentFeedbackIndex + 1) % this.feedbackList.length;
  }


  /**
    * Shows the previous feedback in the carousel and sets slide direction to 'prev'.
    */
  showPreviousFeedback() {
    this.slideDirection = 'prev';
    this.currentFeedbackIndex =
      (this.currentFeedbackIndex - 1 + this.feedbackList.length) % this.feedbackList.length;
  }


  /**
   * Returns the CSS class for a feedback card based on its position relative
   * to the currently active card.
   *
   * @param index - The index of the card in the feedbackList.
   * @returns The class name: 'active', 'prev1', 'prev2', 'next1', 'next2', or 'hidden'.
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


  /**
   * Handles the touchstart event to record initial swipe position.
   * @param event - The TouchEvent triggered on touch start.
   */
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  
  /**
   * Handles the touchend event to detect swipe direction.
   * Swipes left or right trigger the next or previous feedback slide.
   *
   * @param event - The TouchEvent triggered on touch end.
   */
  onTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0].clientX;
    const deltaX = this.startX - endX;
    if (deltaX > 50) {
      this.showNextFeedback();
    } else if (deltaX < -50) {
      this.showPreviousFeedback();
    }
  }
}
