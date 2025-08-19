import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    full_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', Validators.required]
  });

  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    if (this.registerForm.invalid) return;

    const formData = this.registerForm.value;

    this.http.post('http://localhost:5000/api/signup', formData)
      .subscribe({
        next: (res: any) => {
          this.message = res.message;
          this.error = '';

          const userId = res.user_id_number;
          localStorage.setItem('userToken', userId);

          // Fetch full user info
          this.http.get(`http://localhost:5000/api/user/${userId}`)
            .subscribe({
              next: (user: any) => {
                const firstName = user.full_name?.split(' ')[0] || 'User';

                localStorage.setItem('user', JSON.stringify({
                  user_id_number: user.user_id_number,
                  fullName: user.full_name,
                  firstName: firstName,
                  email: user.email
                }));

                this.router.navigate(['/']); 
              },
              error: err => {
                console.error('Failed to fetch user info', err);
                this.router.navigate(['/']);
              }
            });

          this.registerForm.reset();
        },
        error: err => {
          this.error = err.error?.error || 'Registration failed';
          this.message = '';
        }
      });
  }
}
