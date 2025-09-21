import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


/**
* Tracks the mouse position on the document and updates CSS custom properties
* `--mx` and `--my` with the current cursor coordinates.
*
* @param event - The MouseEvent triggered when the mouse moves.
*/
document.addEventListener('mousemove', (event: MouseEvent) => {
  document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
  document.documentElement.style.setProperty('--my', `${event.clientY}px`);
});