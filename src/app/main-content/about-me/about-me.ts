import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss'
})
export class AboutMe {
    constructor(public translate: TranslateService) {
  }
}
