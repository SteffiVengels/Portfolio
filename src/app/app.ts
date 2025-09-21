import { AfterViewInit, Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { State } from './services/state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  hideHeader = false;
  lastScrollTop = 0;


  /**
 * Creates an instance of the App component.
 *
 * @param router - Angular Router to subscribe to navigation events.
 * @param state - Global application state service.
 *
 * @remarks
 * - Listens to NavigationEnd events to determine if the landing page is active.
 * - Sets `state.showRest` accordingly for content visibility.
 */
  constructor(private router: Router, private state: State) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/') {
        } else {
          this.state.showRest.set(true);
        }
      }
    });
  }


  /**
 * Listens to window scroll events to hide or show the header
 * based on scroll direction.
 *
 * @remarks
 * - Hides the header when scrolling down.
 * - Shows the header when scrolling up.
 */
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
