import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { State } from '../../services/state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() hideHeader = false;
  public activeSection: string = '';
  public isMobileMenuOpen: boolean = false;

  constructor(public state: State, public translate: TranslateService) { }


  /**
 * Initializes the component.
 * Sets the translation language based on saved language in localStorage
 * or falls back to the default language ('de').
 */
  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang') ?? this.translate.getFallbackLang() ?? 'de';
    this.translate.use(savedLang);
  }


  /**
 * Checks whether the given section is currently active.
 *
 * @param section - The section name to check.
 * @returns `true` if the section is active, otherwise `false`.
 */
  isActive(section: string): boolean {
    return this.activeSection === section;
  }


  /**
 * Toggles the current language between 'de' and 'en'.
 * Saves the selected language in localStorage.
 */
  toggleLanguage(): void {
    const currentLang = this.translate.getCurrentLang() || this.translate.getFallbackLang();
    const newLang = currentLang === 'de' ? 'en' : 'de';
    this.translate.use(newLang);
    localStorage.setItem('lang', newLang);
  }


  /**
 * Toggles the mobile menu open/closed state.
 * Adds or removes the 'no-scroll' class on the body to prevent background scrolling.
 */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.classList.toggle('no-scroll');
  }
}
