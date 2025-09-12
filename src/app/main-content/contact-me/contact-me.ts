import { Component } from '@angular/core';
import { Contactform } from './contactform/contactform';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [Contactform, TranslatePipe],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss'
})
export class ContactMe {

    constructor(public translate: TranslateService) { }

}
