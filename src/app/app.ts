import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { MainContent } from './main-content/main-content';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, MainContent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  public showRest = false; // Steuerung für andere Elemente
  protected readonly title = signal('Stefanie Vengels');

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // erst ab 30% sichtbar
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target); // nur einmal animieren
        }
      });
    }, options);

    // Alle Elemente auf der Seite beobachten
    document.querySelectorAll('.reveal-left, .reveal-right')
      .forEach(el => observer.observe(el));


    // Fade-In Landing Page + Header
    setTimeout(() => {
      this.showRest = true; // bindet [class.visible] an Landing Page & Header
    }, 1000); // Dauer H1/H3 Animation
  }
}
