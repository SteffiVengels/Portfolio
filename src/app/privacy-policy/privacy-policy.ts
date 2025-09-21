import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicy {

  constructor(public translate: TranslateService) { }


  /**
 * Smoothly scrolls to the element with the given ID.
 *
 * @param id - The ID of the target element to scroll to.
 * @param event - The event that triggered the scroll, used to prevent default behavior.
 *
 * @remarks
 * - Prevents the default hash behavior in the browser.
 * - Uses `scrollIntoView` with smooth behavior and aligns to the start of the element.
 */
  scrollTo(id: string, event: Event) {
    event.preventDefault(); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
