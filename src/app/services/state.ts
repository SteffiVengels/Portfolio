import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class State {

  public showRest = signal(true);

}
