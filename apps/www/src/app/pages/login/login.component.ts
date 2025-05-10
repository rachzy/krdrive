import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'kr-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _accountService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  public isLoading = false;
  public errorMessage = '';

  public readonly loginForm = this._fb.group({
    username: [
      '',
      {
        validators: [Validators.required],
        nonNullable: true,
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required],
        nonNullable: true,
      },
    ],
  });

  public onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.loginForm.disable();

      const { username, password } = this.loginForm.value;

      if (!username || !password) {
        this.errorMessage = 'Username and password are required';
        this.isLoading = false;
        this.loginForm.enable();
        return;
      }

      this._accountService
        .login(username, password)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.loginForm.enable();
          })
        )
        .subscribe({
          next: () => {
            const returnUrl =
              this._route.snapshot.queryParams['returnUrl'] || '/home';
            this._router.navigateByUrl(returnUrl);
          },
          error: (error) => {
            this.errorMessage =
              error.error?.message || 'An error occurred during login';
          },
        });
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
