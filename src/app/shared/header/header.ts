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

  constructor(public state: State, public translate: TranslateService) {
  }

ngOnInit(): void {
  const savedLang = localStorage.getItem('lang') ?? this.translate.getFallbackLang() ?? 'de';
  this.translate.use(savedLang);
}

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  toggleLanguage(): void {
    const currentLang = this.translate.getCurrentLang() || this.translate.getFallbackLang();
    const newLang = currentLang === 'de' ? 'en' : 'de';
    this.translate.use(newLang);
    localStorage.setItem('lang', newLang);
  }
}
