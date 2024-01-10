import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MaterialModule} from "./material.module";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet,MaterialModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer= inject(DomSanitizer);
  title = 'frontend-inventory';

  constructor(){
    this.matIconRegistry.addSvgIcon(
      "menuicon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/menuicon.svg")
    );
  }
  ngOnInit(): void {}
}
