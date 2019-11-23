import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: any;
  mode = 0;
  errorMessage: string;

  constructor( private  authService: AuthService , private router: Router ) { }

  ngOnInit( ) {
  }

  register(form) {
    console.log(form);
    this.authService.register(form)
      .subscribe(data => {
          this.form = data;
          this.mode = 1;
          this.router.navigateByUrl('login');
        },
        err => {
          console.log(err);
          this.errorMessage = err;
          this.mode = 0;
        });
  }
}
