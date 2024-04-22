import { MatSidenav } from "@angular/material/sidenav";
import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "../../material.module";
import { MatIconRegistry } from "@angular/material/icon";
import { RouterLink, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { environment } from "../../environments/environment";
import { ApiService } from "../../services/api.service";
import { ApiResponse } from '../../interfaces/genericresponse';
import { MenuChild, MenuDataDTO } from "../../interfaces/menu/menuDataDTO";
import { CustomErrors } from "../../utils/CustomErrors";


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
export class DashboardComponent implements OnInit {

  /*menuNav =[
    {name: "Categorías", route:"category", icon:"category"},
    {name: "Home", route:"home", icon:"home"},
  ]*/
  menuNav: { menuparent: string, children?: MenuChild[] }[] = [];
  
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  private observer = inject(BreakpointObserver);
  private changeDetector = inject(ChangeDetectorRef);
  private apiService = inject(ApiService);

  customErrorsInstance = new CustomErrors<MenuDataDTO>();


  menu_url = environment.menu_url;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor() {
    this.matIconRegistry.addSvgIcon(
      "menuicon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/menuicon.svg")
    );
  }

  ngAfterViewInit() {

    this.observer.observe(['(max-width: 600px)']).subscribe((resp: any) => {
      if (resp.matches) {
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
    this.apiService.get(this.menu_url).subscribe({
      next: (response: ApiResponse<MenuDataDTO>) => {
        if (response.objectList) {
          this.customErrorsInstance.handleResponse(response);
          this.menuNav = response.objectList.map(menuParent => ({
            menuparent: menuParent.menuparent,
            children: menuParent.menuchildren.map(menuChild => ({
              menuName: menuChild.menuName,
              viewName: menuChild.viewName,
              viewRoute: menuChild.viewRoute
            }))
          }));          
        }
      },
      error: (e) => this.customErrorsInstance.handleError(e),
      complete: () => {

      }
    })

  }
}
