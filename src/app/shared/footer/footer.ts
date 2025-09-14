import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
    constructor(private router: Router, public translate: TranslateService) {
  }

    get isLegalNotice(): boolean {
    return this.router.url === '/legal-notice';
  }
}
