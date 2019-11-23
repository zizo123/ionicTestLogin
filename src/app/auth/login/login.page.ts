import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private mode = 0;

  constructor(private  authService: AuthService , private router: Router ) { }

  ngOnInit( ) {
    const token = this.authService.loadToken();
    if (token) {
      this.router.navigateByUrl('home');
    }
  }

  login(formData) {
    this.authService.login(formData)
      .subscribe(resp => {
          const jwtToken = resp.headers.get('authorization');
          this.authService.saveToken(jwtToken);
          this.router.navigateByUrl('/home');
        },
        err => {
          this.mode = 1;
        });
  }
}
