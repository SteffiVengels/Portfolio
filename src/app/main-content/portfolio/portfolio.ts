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
  selectedProjectIndex: number | null = null;
  public animated = false;


  constructor(public translate: TranslateService) { }


  /**
   * Returns the currently selected project, or `null` if none is selected.
   */
  get selectedProject(): Project | null {
    return this.selectedProjectIndex !== null
      ? this.projectList[this.selectedProjectIndex]
      : null;
  }


  /**
 * Lifecycle hook that is called after the component's view has been initialized.
 *
 * @remarks
 * - Sets up an IntersectionObserver on the `.project_overview` section.
 * - When the section enters the viewport (threshold 0.3), triggers
 *   the card animation by calling `animateCards()`.
 * - Ensures the observer only fires once per section by unobserving the target.
 */
  ngAfterViewInit(): void {
    const section = document.querySelector('.project_overview');
    if (!section) return;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          obs.unobserve(entry.target);
          this.animateCards();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(section);
  }


  /**
   * Triggers the project card animations when the section
   * enters the viewport.  
   * Adds a staggered `visible` class to each card with a delay.
   *
   * @remarks
   * - Uses a base delay before starting animations.
   * - Iterates through all `.project_card.animation` elements.
   * - Ensures cards fade in sequentially with 150ms steps.
   */
  private animateCards(): void {
    const cards = Array.from(document.querySelectorAll('.project_card.animation')) as HTMLElement[];
    const baseDelay = 200;
    setTimeout(() => {
      this.animated = true;
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 150);
      });
    }, baseDelay);
  }


  /**
    * Opens the overlay dialog for the selected project.
    *
    * @param index - Index of the project to open in the dialog.
    */
  openDialog(index: number): void {
    this.selectedProjectIndex = index;
    document.body.classList.add('no-scroll');
  }
}
