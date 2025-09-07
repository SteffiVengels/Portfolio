import { Component, AfterViewInit, Renderer2, ElementRef, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage implements AfterViewInit {
    @Input() showRest: boolean = false;

  constructor(public translate: TranslateService) {}

  ngAfterViewInit(): void {
    // Called after the component's view has been fully initialized
  }


}



