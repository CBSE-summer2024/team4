import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.authService.validateUser(this.username, this.password)) {
      console.log('Login successful');
      this.loginFailed = false;
      window.alert('Logged in successfully!');
    
    } else {
      console.log('Login failed');
      this.loginFailed = true;
    }
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
