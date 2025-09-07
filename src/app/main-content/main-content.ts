import { Component, Input } from '@angular/core';
import { LandingPage } from './landing-page/landing-page';
import { AboutMe } from './about-me/about-me';
import { Skills } from './skills/skills';
import { Portfolio } from './portfolio/portfolio';
import { References } from './references/references';
import { ContactMe } from './contact-me/contact-me';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [LandingPage, AboutMe, Skills, Portfolio, References, ContactMe],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss'
})
export class MainContent {
    @Input() showRest: boolean = false;

}
