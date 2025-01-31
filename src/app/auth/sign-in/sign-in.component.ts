import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  // On Forgotpassword link click
  onForgotpassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

  // On Signup link click
  onSignup() {
    console.log('chamou aqui')
    this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
  }

  onLogin() {
    console.log('chamou aqui')
    this.router.navigate(['/'], { relativeTo: this.route.parent });
  }


  ngOnInit(): void {
  }

}
