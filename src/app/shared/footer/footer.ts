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

private specialRoutes = ['/legal-notice', '/privacy-policy'];

get isSpecialPage(): boolean {
  return this.specialRoutes.includes(this.router.url);
}
}
