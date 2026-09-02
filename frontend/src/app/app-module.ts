import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Courses } from './courses/courses';
import { Navbar } from './components/navbar/navbar';
import { Profile } from './pages/profile/profile';
import { RegisterComponent } from './register/register';

@NgModule({
  declarations: [
    App,
    Courses,
    Navbar,
    Profile,
    RegisterComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],

  bootstrap: [
    App
  ]
})
export class AppModule {}
