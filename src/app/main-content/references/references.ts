import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references.html',
  styleUrl: './references.scss'
})
export class References {

  feedbackList = [
    {
      id: 1,
      name: 'H. Janisch',
      role: 'Team Partner',
      text: 'Lukas has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project. '
    },
    {
      id: 2,
      name: 'A. Fischer',
      role: 'Team Partner',
      text: 'I had the good fortune of working with Lukas in a group project at the Developer Akademie that involved a lot of effort. He always stayed calm, cool, and focused, and made sure our team was set up for success. He is super knowledgeable, easy to work with, and I\'d happily work with him again given the chance.'
    },
    {
      id: 3,  
      name: 'T. Schulz',
      role: 'Frontend Developer',
      text: 'Our project benefited enormously from Simon efficient way of working.'
    }
  ];

  currentFeedbackIndex = 0;

  showNextFeedback() {
    this.currentFeedbackIndex = (this.currentFeedbackIndex + 1) % this.feedbackList.length;
  }
  showPreviousFeedback() {
    this.currentFeedbackIndex = (this.currentFeedbackIndex - 1 + this.feedbackList.length) % this.feedbackList.length;
  }

}
