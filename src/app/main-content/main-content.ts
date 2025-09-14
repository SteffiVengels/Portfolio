import { AfterViewInit, Component, Input } from '@angular/core';
import { LandingPage } from './landing-page/landing-page';
import { AboutMe } from './about-me/about-me';
import { Skills } from './skills/skills';
import { Portfolio } from './portfolio/portfolio';
import { References } from './references/references';
import { ContactMe } from './contact-me/contact-me';
import { State } from '../services/state';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [LandingPage, AboutMe, Skills, Portfolio, References, ContactMe],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss'
})
export class MainContent implements AfterViewInit {
  constructor(public state: State) {}

  ngAfterViewInit(): void {
    // Landing Page startet unsichtbar
    this.state.showRest.set(false);

    // IntersectionObserver für Reveal-Animationen
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.reveal-left, .reveal-right')
      .forEach(el => observer.observe(el));

    // Nach 1 Sekunde Landing Page sichtbar machen
    setTimeout(() => this.state.showRest.set(true), 1000);
  }

}
