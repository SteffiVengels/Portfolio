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

  constructor(public state: State) { }


  /**
 * Lifecycle hook that is called after the component's view has been initialized.
 *
 * @remarks
 * - Initially hides the landing page content by setting `state.showRest` to false.
 * - Calls `setupRevealObserver()` to initialize IntersectionObserver for reveal animations.
 * - After 1 second, sets `state.showRest` to true to show the rest of the content.
 */
  ngAfterViewInit(): void {
    this.state.showRest.set(false);
    this.setupRevealObserver();
    setTimeout(() => this.state.showRest.set(true), 1000);
  }


  /**
 * Sets up an IntersectionObserver for all elements with `.reveal-left` or `.reveal-right` classes.
 * Adds the `reveal-visible` class when the element enters the viewport and unobserves it afterward.
 *
 * @remarks
 * - Threshold is set to 0.3 for triggering the animation.
 */
  private setupRevealObserver(): void {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.reveal-left, .reveal-right').forEach(el => observer.observe(el));
  }
}
