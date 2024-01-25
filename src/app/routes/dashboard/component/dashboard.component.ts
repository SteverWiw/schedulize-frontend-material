import {MatSidenav} from "@angular/material/sidenav";
import {ChangeDetectorRef, Component, inject, OnInit, ViewChild} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {BreakpointObserver} from "@angular/cdk/layout";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../../../material.module";
import {MatIconRegistry} from "@angular/material/icon";
import { RouterLink, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import { TokenService } from "../../../services/auth-service/TokenService";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  menuNav =[
    {name: "Categorías", route:"category", icon:"category"},
    {name: "Home", route:"home", icon:"home"},
  ]

  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer= inject(DomSanitizer);
  private observer = inject(BreakpointObserver);
  private changeDetector = inject(ChangeDetectorRef);
  private tokenService = inject(TokenService);

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(){
    this.matIconRegistry.addSvgIcon(
      "menuicon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/menuicon.svg")
    );
  }

  ngAfterViewInit() {

    this.observer.observe(['(max-width: 600px)']).subscribe((resp: any) => {
      if(resp.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty

  }
}
