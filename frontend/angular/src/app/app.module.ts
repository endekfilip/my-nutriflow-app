import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuItem1Component } from './menu-item-1/menu-item-1.component';
import { MenuItem2Component } from './menu-item-2/menu-item-2.component';
import { FormsModule } from "@angular/forms";
import { CalorieCounterComponent } from './calorie-counter/calorie-counter.component';
import { CalorieShowComponent } from './calorie-show/calorie-show.component';
import { NgOptimizedImage } from "@angular/common";
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

// --- AUTH COMPONENTS ---
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component'; // <--- ADDED THIS

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    MenuItemComponent,
    MenuItem1Component,
    MenuItem2Component,
    CalorieCounterComponent,
    CalorieShowComponent,
    RegisterComponent,
    LoginComponent // <--- ADDED THIS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }