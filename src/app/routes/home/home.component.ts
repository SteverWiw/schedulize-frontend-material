import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DashboardComponent} from "../dashboard/component/dashboard.component";
import {MaterialModule} from "../../material.module";
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {AuthComponent} from "../../auth/auth.component";
import { RouterOutlet} from "@angular/router";
import {LandingPageComponent} from "./landing-page/landing-page.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardComponent, AuthComponent, MaterialModule, HeaderComponent, FooterComponent,  RouterOutlet, LandingPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
