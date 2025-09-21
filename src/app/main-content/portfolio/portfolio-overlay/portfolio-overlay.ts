import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Project {
  title: string;
  skills: string[];
  imagePreview: string;
  imageDialog: string;
  github: string;
  subdomain: string;
}
@Component({
  selector: 'app-portfolio-overlay',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './portfolio-overlay.html',
  styleUrl: './portfolio-overlay.scss'
})


export class PortfolioOverlay {

  @Input() projectList: Project[] = [];
  @Input() currentIndex: number = 0;
  @Output() closed = new EventEmitter<void>();

  isOpen = false;

  constructor(public translate: TranslateService) { }

  /**
   * Initializes the overlay and triggers the opening animation.
   */
  ngOnInit() {
    setTimeout(() => this.isOpen = true, 10);
  }


  /**
   * Returns the currently selected project.
   */
  get selectedProject() {
    return this.projectList[this.currentIndex];
  }


  /**
   * Returns the formatted number of the current project (e.g., "01", "02").
   */
  get number(): string {
    return (this.currentIndex + 1).toString().padStart(2, '0');
  }


  /**
 * Switches to the next project in the list.  
 * Loops back to the first project if the end is reached.
 */
  nextProject() {
    this.currentIndex = (this.currentIndex + 1) % this.projectList.length;
  }


  /**
   * Closes the overlay and emits the `closed` event after the exit animation.
   */
  closeDialog(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.closed.emit();
      document.body.classList.remove('no-scroll');
    }, 300);
  }
}
