import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioOverlay } from './portfolio-overlay/portfolio-overlay';

interface Project {
  title: string;
  skills: string[];
  imagePreview: string;
  imageDialog: string;
  github: string;
  subdomain: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslatePipe, CommonModule, PortfolioOverlay],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})

export class Portfolio implements AfterViewInit {
  projectList = [
    {
      title: 'Join',
      skills: ['JavaScript', 'Firebase', 'HTML', 'CSS'],
      imagePreview: 'assets/img/portfolio/join.png',
      imageDialog: 'assets/img/portfolio/join_dialog.png',
      github: 'https://github.com/SteffiVengels/Portfolio',
      subdomain: 'https://join.stefanie-vengels.dev/'
    },
    {
      title: 'Happy Hollow',
      skills: ['JavaScript', 'HTML', 'CSS'],
      imagePreview: 'assets/img/portfolio/happyhollow.png',
      imageDialog: 'assets/img/portfolio/happyhollow_dialog.png',
      github: 'https://github.com/SteffiVengels/Happy_Hollow',
      subdomain: 'https://happy-hollow.stefanie-vengels.dev/'
    },
    {
      title: 'Portfolio',
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS'],
      imagePreview: 'assets/img/portfolio/portfolio.png',
      imageDialog: 'assets/img/portfolio/portfolio_dialog.png',
      github: 'https://github.com/SteffiVengels/Portfolio',
      subdomain: 'https://stefanie-vengels.dev/'
    }
  ];

  hoveredIndex: number | null = null;
  public animated = false;

  selectedProjectIndex: number | null = null;

  constructor(public translate: TranslateService) { }

  get selectedProject(): Project | null {
    return this.selectedProjectIndex !== null
      ? this.projectList[this.selectedProjectIndex]
      : null;
  }

  ngAfterViewInit(): void {
    const section = document.querySelector('.project_overview');
    if (!section) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          obs.unobserve(entry.target); // nur einmal auslösen

          // Base-Delay bevor die Animation startet
          const cards = Array.from(document.querySelectorAll('.project_card.animation')) as HTMLElement[];
          const baseDelay = 200;

          setTimeout(() => {
            this.animated = true; // bindet [class.visible] im HTML
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('visible');
              }, i * 150);
            });
          }, baseDelay);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(section);
  }

  openDialog(index: number): void {
    this.selectedProjectIndex = index;
    document.body.classList.add('no-scroll');
  }
}
