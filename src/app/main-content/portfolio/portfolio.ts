import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio {
  projectlist = [
    {
      title: 'Join',
      skills: ['JavaScript', 'Firebase', 'HTML', 'CSS'],
      imagePreview: 'assets/img/portfolio/join.png',
      link: 'https://https://github.com/SteffiVengels/Portfolio',
      subdomain: 'https://steffivengels.github.io/Portfolio/'
    },
    {
      title: 'Happy Hollow',
      skills: ['JavaScript', 'HTML', 'CSS'],
      imagePreview: 'assets/img/portfolio/happyhollow.png',
      link: 'https://github.com/SteffiVengels/Happy_Hollow',
      subdomain: 'https://steffivengels.github.io/Happy_Hollow/'
    },
    {
      title: 'Portfolio',
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS'],
      imagePreview: 'assets/img/portfolio/portfolio.png',
      link: 'https://github.com/SteffiVengels/Join',
      subdomain: 'https://steffivengels.github.io/Join/'
    },
    {
      title: 'DA Bubble',
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      imagePreview: 'assets/img/portfolio/dabubble.png',
      link: 'https://github.com/SteffiVengels/DA_Bubble',
      subdomain: 'https://steffivengels.github.io/DA_Bubble/'
    }
  ];
  

  constructor(public translate: TranslateService) {
  }

  hoveredIndex: number | null = null; // Index der gerade gehyoverten Karte
}
