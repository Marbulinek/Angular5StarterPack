import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { AppConfigService } from '../configs/app.config.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  providers:[
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfigService) => () => config.loadConfigurationFile(), deps: [AppConfigService], multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
