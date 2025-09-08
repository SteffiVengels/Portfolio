import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio implements AfterViewInit {
  projectlist = [
    {
      title: 'Join',
      skills: ['JavaScript', 'Firebase', 'HTML', 'CSS'],
      imagePreview: 'assets/img/portfolio/join.png',
      link: 'https://https://github.com/SteffiVengels/Portfolio',
      subdomain: 'https://steffivengels.github.io/Portfolio/'
    },
    {
      title: 'Happy Hollow',
      skills: ['JavaScript', 'HTML', 'CSS'],
      imagePreview: 'assets/img/portfolio/happyhollow.png',
      link: 'https://github.com/SteffiVengels/Happy_Hollow',
      subdomain: 'https://steffivengels.github.io/Happy_Hollow/'
    },
    {
      title: 'Portfolio',
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS'],
      imagePreview: 'assets/img/portfolio/portfolio.png',
      link: 'https://github.com/SteffiVengels/Join',
      subdomain: 'https://steffivengels.github.io/Join/'
    }
  ];

  hoveredIndex: number | null = null;
  public animated = false;

  constructor(public translate: TranslateService) { }

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
}




