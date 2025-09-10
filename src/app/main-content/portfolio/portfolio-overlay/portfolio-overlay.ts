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

  ngOnInit() {
    // Animation starten, sobald das Overlay gerendert ist
    setTimeout(() => this.isOpen = true, 10);
  }

  get selectedProject() {
    return this.projectList[this.currentIndex];
  }

  get number(): string {
    return (this.currentIndex + 1).toString().padStart(2, '0');
  }

  nextProject() {
    this.currentIndex = (this.currentIndex + 1) % this.projectList.length;
  }

  closeDialog(): void {
    this.isOpen = false;
    // Overlay nach Animation schließen
    setTimeout(() => {
      this.closed.emit();
      document.body.classList.remove('no-scroll');
    }, 300); // Dauer entspricht CSS-Transition
  }

  constructor(public translate: TranslateService) { }
}
