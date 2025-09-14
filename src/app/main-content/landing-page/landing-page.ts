import { Component, AfterViewInit, Renderer2, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';
import { State } from '../../services/state';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

  constructor(public state: State, public translate: TranslateService) {}


}



