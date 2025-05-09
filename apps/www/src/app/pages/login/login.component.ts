import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'kr-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly _fb = inject(FormBuilder);

  public readonly loginForm = this._fb.group({
    username: ['', [Validators.required]],
    passkey: ['', [Validators.required]],
  });

  public onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login attempt:', this.loginForm.value);
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get passkey() {
    return this.loginForm.get('passkey');
  }
}
