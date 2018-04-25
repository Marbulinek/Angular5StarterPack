import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModule } from './application/app.module';

enableProdMode();

const platform = platformBrowser();
platform.bootstrapModule(AppModule);