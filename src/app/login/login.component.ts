import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  title = 'Document Sign - Login';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if(this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password: ', this.password);
    }

    this.router.navigate(['/home']);
  }

  goToSignUpPage(): void {
    console.log("Navigating to Sign Up page");
    // Here you would typically use a router to navigate to the sign-up page
    // For example: this.router.navigate(['/register']);
    this.router.navigate(['/register']);
  }

  signInWithGoogle(): void {
    console.log("Sign in with Google clicked");
    // Here you would typically call a service to handle Google sign-in
  }

  signInWithFacebook(): void {
    console.log("Sign in with Facebook clicked");
    // Here you would typically call a service to handle Facebook sign-in
  }

  signInWithTwitter(): void {
    console.log("Sign in with Twitter clicked");
    // Here you would typically call a service to handle Twitter sign-in
  }

  signInWithLinkedIn(): void {
    console.log("Sign in with LinkedIn clicked");
    // Here you would typically call a service to handle LinkedIn sign-in
  }

  signInWithGitHub(): void {
    console.log("Sign in with GitHub clicked");
    // Here you would typically call a service to handle GitHub sign-in
  }

  signInWithApple(): void {
    console.log("Sign in with Apple clicked");
    // Here you would typically call a service to handle Apple sign-in
  }
}
