import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from './service/auth.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']

})
export class SignInComponent implements OnInit {
  loginUser = new FormGroup({
    registration: new FormControl(''), password: new FormControl(''),
  });

  hide = true;
  constructor(
    private authService: AuthService,
    private sweetalertService: SweetalertService,
    private router: Router,
    private route: ActivatedRoute) { }

  // On Forgotpassword link click
  onForgotpassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

  // On Signup link click
  onSignup() {
    this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
  }


  ngOnInit(): void {
  }


  onLogin() {
    this.authService.loginClient(this.loginUser.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.token)
      },
      error: err => {
        this.sweetalertService.alert('error', 'Ops...', 'Erro: ' + err.error.error)
      },
      complete: () => {
        this.router.navigate(['/'], { relativeTo: this.route.parent });
      }
    })
  }

}
