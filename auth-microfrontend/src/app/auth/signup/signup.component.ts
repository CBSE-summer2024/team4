import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.authService.saveUser(this.username, this.password);
    console.log('User signed up successfully');
    // Optionally navigate to a different page upon successful signup
    // this.router.navigate(['/home']); // Uncomment and use if you want to navigate after signup
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
