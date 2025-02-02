import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from './model/LoginRequest';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  loginRequest: LoginRequest = new LoginRequest();
  userData: any;
  errorMessage: string = ''; // Definição da propriedade errorMessage


  constructor(private formBuilder: FormBuilder, private router: Router,  private authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.loading = true;
    this.loginRequest = new LoginRequest(this.loginForm.value);

    this.authService.preAuthenticate(this.loginRequest).subscribe({
      next: response => {
        const token = response.headers.get('Authorization') || '';
        this.loading=false;
        this.authService.storeToken(token);
        this.router.navigate(['/']);
      },
      error: error => {
        console.error('Erro na requisição:', error);
        this.loading = false;
      }
    })


  }
}



