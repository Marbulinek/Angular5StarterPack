import { Component } from '@angular/core';
import { AppConfigService } from '../configs/app.config.service';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
    </div>
    `
})
export class AppComponent {
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor(private appConfigService: AppConfigService) {
    //e.g.: here can be your web api settings | from configs json files
    let configVariable = this.appConfigService.getSpecificConfig('webapi-url');
  }

}