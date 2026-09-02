import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitting = false;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        age: [null, [Validators.min(16), Validators.max(100)]]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.serverError = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { confirmPassword, ...payload } = this.registerForm.value;

    this.authService.register(payload).subscribe({
      next: (response) => {
        this.submitting = false;
        this.authService.setAuth(response.token, response.user);
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        this.submitting = false;
        this.serverError = error?.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
