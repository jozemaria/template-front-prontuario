import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']

})
export class SignInComponent implements OnInit {
  loginUser = new FormGroup({
    registration: new FormControl('11223344'), password: new FormControl('123456'),
  });

  hide = true;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  // On Forgotpassword link click
  onForgotpassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

  // On Signup link click
  onSignup() {
    console.log('chamou aqui')
    this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
  }

  // onLogin() {
  //   console.log('chamou aqui')
  //
  // }


  ngOnInit(): void {
  }


  onLogin() {
    console.log(`chamou enviando`)
    console.log(this.loginUser.value)
    this.authService.loginClient(this.loginUser.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.token)

      },
      error: err => {
        // this.sweetalertService.alert('error', 'Ops...', 'Erro: ' + err.error.error)
        // this.loadingService.hide()
      },
      complete: () => {
        this.router.navigate(['/'], { relativeTo: this.route.parent });
        // this.loadingService.hide()
      }
    })
  }

}
