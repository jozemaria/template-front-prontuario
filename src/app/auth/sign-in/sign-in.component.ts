import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './service/auth.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginUser = new FormGroup({
    registration: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  hide = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private sweetalertService: SweetalertService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  get registrationControl() {
    return this.loginUser.get('registration');
  }

  get passwordControl() {
    return this.loginUser.get('password');
  }

  onLogin(): void {
    if (this.loginUser.invalid || this.isLoading) {
      this.loginUser.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.loginClient(this.loginUser.value).subscribe({
      next: (res: any) => {
        this.tokenService.setToken(res.token);
      },
      error: () => {
        this.isLoading = false;
        this.sweetalertService.alert(
          'error',
          'Falha na autenticação',
          'Matrícula ou senha inválidos. Tente novamente.'
        );
      },
      complete: () => {
        this.isLoading = false;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
    });
  }
}
