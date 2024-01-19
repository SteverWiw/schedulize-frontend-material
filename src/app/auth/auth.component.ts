import {Input, Component, Output, EventEmitter, inject} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {MaterialModule} from "../material.module";
import {NgIf} from "@angular/common";
import {NgbAlertModule,} from '@ng-bootstrap/ng-bootstrap';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../services/auth-service/auth.service';
import {Authrequest} from "../services/auth-service/authrequest";
import {DashboardComponent} from "../routes/dashboard/component/dashboard.component";
import {Router} from "@angular/router";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
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
    NgbAlertModule,
    DashboardComponent
  ]
})
export class AuthComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);


  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  })


  login() {


    if (this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');

      if (usernameControl && passwordControl) {
        const authrequest: Authrequest = {
          userName: usernameControl.value ?? '',
          password: passwordControl.value ?? ''
        };

      this.authService.login(authrequest).subscribe({
        next: () => {
          if (this.authService.isAuth()) {
            this.isAuth();
          }
        },
        error: (e) => {
          if (e.status === 401) {
            alert('Usuario no autorizado. Redirigiendo a la página de inicio de sesión.');
          }else{
            alert('Error en la solicitud HTTP:'+ e);
          }
        },
        complete: () => {

        }

      });
    }
    } else {
      this.loginForm.markAsTouched();
    }
  }


  isAuth() {
    this.router.navigate(["../../dashboard"]) ;
  }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();


  validUserControl = new FormControl('', [Validators.required, Validators.nullValidator]);
  validPassControl = new FormControl('', [Validators.required, Validators.nullValidator]);
  matcher = new MyErrorStateMatcher();
}
