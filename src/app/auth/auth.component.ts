import { Input, Component, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MaterialModule } from "../material.module";
import { NgIf } from "@angular/common";
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Authrequest } from "../services/auth-service/authrequest";
import { DashboardComponent } from "../routes/dashboard/component/dashboard.component";
import { Router } from "@angular/router";
import { SnackbarService } from '../services/alerts/snackbar.service';
import { ApiResponse } from '../interfaces/genericresponse';
import { TokenService } from '../services/auth-service/TokenService';
import { HttpErrorResponse } from '@angular/common/http';

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
  private snackBar = inject(SnackbarService);
  private tokenService = inject(TokenService);

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
      next: (response: ApiResponse) => this.handleLoginResponse(response),
      error: (e) => this.handleLoginError(e),
      complete: () => {this.redirect();}
    });
  }

  private handleLoginResponse(response: ApiResponse): void {
    const code = parseFloat(response.metaData[0]?.code || '0');
    if (this.isValidResponse(response, code)) {
      this.handleSuccessfulLogin(response);
    } else {
      this.handleUnsuccessfulLogin(response);
    }
  }

  private isValidResponse(response: ApiResponse, code: number): boolean {
    return response.metaData && response.metaData.length > 0 && !isNaN(code) && code >= 20 && code <= 29;
  }

  private handleSuccessfulLogin(response: ApiResponse): void {
    if (response.objectList) {
      this.tokenService.setToken(response.objectList[0].token);
      const userData = this.tokenService.getUserData();
      this.message = `Bienvenido ${userData.FIRST_NAME} ${userData.SECOND_NAME} ${userData.FIRST_SURNAME} ${userData.SECOND_SURNAME}`;
      this.snackBar.openSuccess(this.message);
    }
  }

  private handleUnsuccessfulLogin(response: ApiResponse): void {
    this.snackBar.openInfo(response.metaData[0]?.type || 'Error desconocido');
  }

  private handleLoginError(error: any): void {
    if (error instanceof HttpErrorResponse && error.error) {
      const apiResponse = error.error as ApiResponse;

      if (apiResponse.metaData && apiResponse.metaData.length > 0) {
        const customErrorMessage = apiResponse.metaData[0]?.type || 'Error desconocido';
        this.snackBar.openError(customErrorMessage);
        return;
      }
    }

    // Si no es un error de ApiResponse esperado, muestra el mensaje de error HTTP predeterminado
    this.snackBar.openError(error.message || 'Error desconocido');
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
