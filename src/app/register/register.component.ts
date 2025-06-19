import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Error messages
  emailError: string = '';
  usernameError: string = '';
  phoneError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.emailError = 'Email is required';
      return false;
    }
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Please enter a valid email address';
      return false;
    }
    this.emailError = '';
    return true;
  }

  validateUsername(): boolean {
    if (!this.username) {
      this.usernameError = 'Username is required';
      return false;
    }
    if (this.username.length < 3) {
      this.usernameError = 'Username must be at least 3 characters';
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(this.username)) {
      this.usernameError = 'Username can only contain letters, numbers, and underscores';
      return false;
    }
    this.usernameError = '';
    return true;
  }

  validatePhone(): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!this.phone) {
      this.phoneError = 'Phone number is required';
      return false;
    }
    if (!phoneRegex.test(this.phone.replace(/[\s\-$$$$]/g, ''))) {
      this.phoneError = 'Please enter a valid phone number';
      return false;
    }
    this.phoneError = '';
    return true;
  }

  validatePassword(): boolean {
    if (!this.password) {
      this.passwordError = 'Password is required';
      return false;
    }
    if (this.password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters';
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(this.password)) {
      this.passwordError = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      return false;
    }
    this.passwordError = '';
    return true;
  }

  validateConfirmPassword(): boolean {
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password';
      return false;
    }
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
      return false;
    }
    this.confirmPasswordError = '';
    return true;
  }

  isFormValid(): boolean {
    return this.validateEmail() && 
           this.validateUsername() && 
           this.validatePhone() && 
           this.validatePassword() && 
           this.validateConfirmPassword() && 
           this.acceptTerms;
  }

  onSubmit(): void {
    // Validate all fields
    const isEmailValid = this.validateEmail();
    const isUsernameValid = this.validateUsername();
    const isPhoneValid = this.validatePhone();
    const isPasswordValid = this.validatePassword();
    const isConfirmPasswordValid = this.validateConfirmPassword();

    if (isEmailValid && isUsernameValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid && this.acceptTerms) {
      console.log('Registration attempt:', {
        email: this.email,
        username: this.username,
        phone: this.phone,
        password: this.password
      });
      // Implement your registration logic here
    }
  }

  signUpWithGoogle(): void {
    console.log('Sign up with Google');
    // Implement Google sign-up logic
  }

  signUpWithFacebook(): void {
    console.log('Sign up with Facebook');
    // Implement Facebook sign-up logic
  }

  signUpWithApple(): void {
    console.log('Sign up with Apple');
    // Implement Apple sign-up logic
  }

  goToSignIn(): void {
    console.log('Navigate to sign in page');
    // Implement navigation to sign-in page
    this.router.navigate(['']);
  }
}