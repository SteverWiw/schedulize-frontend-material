import {Input, Component, Output, EventEmitter, inject, ViewChild} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {MaterialModule} from "../material.module";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {  NgbAlertModule, } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterLink,
        NgIf,
        NgbAlertModule 
    ]
})
export class AuthComponent {
  private formBuilder = inject(FormBuilder);
 
  loginForm = this.formBuilder.group({
    username:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
  })



  login(){
    if(this.loginForm.valid){      
      console.log("entar al loguin"); 
    }else {
      console.error('Formulario no válido');
      alert("Usuario no valido");
    }
  }

 
  isAuth(){
    return "../../dashboard";
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}