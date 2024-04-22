import { Input, Component, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MaterialModule } from "../../material.module";
import { NgIf } from "@angular/common";
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { Authrequest } from "../../interfaces/auth/authinterface";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { Router } from "@angular/router";
import { ApiResponse } from '../../interfaces/genericresponse';
import { TokenService } from '../../services/Token.service';
import { CustomErrors } from '../../utils/CustomErrors';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control?.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgIf,
    DashboardComponent,
  ]
})
export class AuthComponent {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  customErrorsInstance = new CustomErrors<string>();

  public message!: string;
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  })


  login() {

    if (!this.loginForm.valid) {
      this.loginForm.markAsTouched();
      return;
    }

    const usernameControl = this.loginForm.get('username');
    const passwordControl = this.loginForm.get('password');

    if (!usernameControl || !passwordControl) {
      return;
    }

    const authrequest: Authrequest = {
      userName: usernameControl.value ?? '',
      password: passwordControl.value ?? ''
    };

    this.authService.login(authrequest).subscribe({
      next: (response: ApiResponse<string>) => {
        if (response.objectList) {
          this.customErrorsInstance.handleResponse(response)
          const token: string = JSON.stringify(response.objectList[0]);
          const match = token.match(/{"token":"(.*?)"/); // Realizar la coincidencia con la expresión regular

          if (match && match[1]) {
            const token = match[1]; // El grupo de captura (.*?) contiene el valor del token
            console.log(token);
            this.tokenService.setToken(token);
          } else {
            console.log('No se encontró un token en la cadena.');
          }          
        }
      },
      error: (e) => this.customErrorsInstance.handleError(e),
      complete: () => {
        this.redirect();
      }
    });
  }

  redirect() {
    this.router.navigate(["/dashboard"]);
  }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();


  validUserControl = new FormControl('', [Validators.required, Validators.nullValidator]);
  validPassControl = new FormControl('', [Validators.required, Validators.nullValidator]);
  matcher = new MyErrorStateMatcher();
}
