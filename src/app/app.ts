import { AfterViewInit, Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { Header } from './shared/header/header';
import { MainContent } from './main-content/main-content';
import { Footer } from './shared/footer/footer';
import { State } from './services/state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, MainContent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  hideHeader = false;
  lastScrollTop = 0;

  constructor(private router: Router, private state: State) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/') {
          // Landing Page → delay wird in MainContent gesetzt
        } else {
          // Andere Routen → Header sofort sichtbar
          this.state.showRest.set(true);
        }
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll > this.lastScrollTop) {
      this.hideHeader = true;
    } else {
      this.hideHeader = false;
    }
    this.lastScrollTop = currentScroll;
  }
}
