import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {

  skillList = [
    { name: 'HTML', img: 'html.png' },
    { name: 'CSS', img: 'css.png' },
    { name: 'JavaScript', img: 'js.png' },
    { name: 'Material Design', img: 'materialdesign.png' },
    { name: 'TypeScript', img: 'ts.png' },
    { name: 'Angular', img: 'angular.png' },
    { name: 'Firebase', img: 'firebase.png' },
    { name: 'Git', img: 'git.png' },
    { name: 'REST-API', img: 'rest-api.png' },
    { name: 'Scrum', img: 'scrum.png' }
  ]
  constructor(public translate: TranslateService) {
  }

}
