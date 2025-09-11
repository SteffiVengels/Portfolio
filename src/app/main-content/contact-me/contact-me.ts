import { Component } from '@angular/core';
import { Contactform } from './contactform/contactform';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [Contactform],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss'
})
export class ContactMe {

}
