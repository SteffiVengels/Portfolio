import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { State } from '../../services/state';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements AfterViewInit, OnDestroy {

  // Snowflake animation
  private toggleSnowFlakes = false;
  private isSnowActive = false;
  private snowContainer!: HTMLElement;
  private snowflakes: HTMLElement[] = [];
  private snowflakeInterval: any = null;
  private isTabActive = true;
  private readonly particlesPerThousandPixels = 0.1;
  private readonly fallSpeed = 1.25;
  private readonly pauseWhenNotActive = true;
  private readonly maxSnowflakes = 100;
  private boundResize = () => this.onResize();
  private boundVisibility = () => this.onVisibilityChange();
  private ngContentAttrName: string | null = null;
  //Snowflake animation

  constructor(public state: State, public translate: TranslateService) { }


  // Snowflake animation
  toggleChristmasVersion(): void {
    this.toggleSnowFlakes = !this.toggleSnowFlakes;
    if (this.toggleSnowFlakes) {
      if (!this.isSnowActive) {
        this.isSnowActive = true;
        this.generateSnowflakes();
      }
    } else {
      this.stopSnow();
    }
  }


  ngAfterViewInit(): void {
    this.snowContainer = document.querySelector('.snow-container') as HTMLElement;
    if (!this.snowContainer) {
      console.warn('snow-container element not found.');
      return;
    }
    this.ngContentAttrName =
      Array.from(this.snowContainer.attributes)
        .map(a => a.name)
        .find(n => n.startsWith('_ngcontent-')) || null;
    window.addEventListener('resize', this.boundResize);
    document.addEventListener('visibilitychange', this.boundVisibility);
    if (this.toggleSnowFlakes) {
      this.isSnowActive = true;
      this.generateSnowflakes();
    }
  }


  ngOnDestroy(): void {
    this.stopSnow();
    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('visibilitychange', this.boundVisibility);
  }


  private stopSnow(): void {
    clearInterval(this.snowflakeInterval);
    this.snowflakeInterval = null;
    this.isSnowActive = false;
    this.snowflakes.forEach(f => f.remove());
    this.snowflakes.length = 0;
  }


  private onResize(): void {
    if (!this.isSnowActive) return;
    clearInterval(this.snowflakeInterval);
    setTimeout(() => this.generateSnowflakes(), 300);
  }


  private onVisibilityChange(): void {
    if (!this.pauseWhenNotActive) return;
    this.isTabActive = !document.hidden;
    if (!this.isSnowActive) return;
    if (this.isTabActive) {
      this.generateSnowflakes();
    } else {
      clearInterval(this.snowflakeInterval);
    }
  }


  private generateSnowflakes(): void {
    if (!this.isSnowActive || !this.snowContainer) return;
    const numberOfParticles =
      Math.ceil((window.innerWidth * window.innerHeight) / 8000) *
      this.particlesPerThousandPixels;
    const interval = 5000 / numberOfParticles;
    clearInterval(this.snowflakeInterval);
    this.snowflakeInterval = setInterval(() => {
      if (this.isTabActive &&
        this.isSnowActive &&
        this.snowflakes.length < this.maxSnowflakes) {
        requestAnimationFrame(() => this.createSnowflake());
      }
    }, interval);
  }


  private createSnowflake(): void {
    if (!this.isSnowActive || !this.snowContainer) return;
    if (this.snowflakes.length >= this.maxSnowflakes) return;
    const snowflake = document.createElement('div');
    if (this.ngContentAttrName) snowflake.setAttribute(this.ngContentAttrName, '');
    snowflake.classList.add('snowflake');
    this.snowflakes.push(snowflake);
    this.snowContainer.appendChild(snowflake);
    this.resetSnowflake(snowflake);
  }


  private resetSnowflake(snowflake: HTMLElement): void {
    if (!this.isSnowActive) return;
    const size = Math.random() * 5 + 1;
    const viewportWidth = window.innerWidth - size;
    const viewportHeight = window.innerHeight;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * viewportWidth}px`;
    snowflake.style.top = `-${size}px`;
    const durationSec = (Math.random() * 3 + 8) / this.fallSpeed;
    const useFall = Math.random() < 0.5;
    this.applyAnimation(snowflake, useFall ? 'fall' : 'diagonal', durationSec);
    setTimeout(() => {
      if (document.body.contains(snowflake)) {
        const currentTop = snowflake.getBoundingClientRect().top;
        if (currentTop < viewportHeight) {
          this.resetSnowflake(snowflake);
        } else {
          snowflake.remove();
          const idx = this.snowflakes.indexOf(snowflake);
          if (idx > -1) this.snowflakes.splice(idx, 1);
        }
      }
    }, durationSec * 1000);
  }


  private applyAnimation(el: HTMLElement, mode: 'fall' | 'diagonal', durationSec: number): void {
    if (!this.isSnowActive) return;
    el.classList.remove('anim-fall', 'anim-diagonal');
    el.style.setProperty('--dur', `${durationSec}s`);
    (el as any).offsetWidth;
    el.classList.add(mode === 'fall' ? 'anim-fall' : 'anim-diagonal');
  }
}
// Snowflake animation



