import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.http.post('http://localhost:5000/api/login', this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          this.message = res.message;
          this.error = '';

          const userId = res.user_id_number;
          localStorage.setItem('userToken', userId);


          this.http.get(`http://localhost:5000/api/user/${res.user_id_number}`).subscribe({
            next: (user: any) => {
              const userObj = { firstName: user.full_name.split(' ')[0] }; 
              localStorage.setItem('user', JSON.stringify(userObj));
              this.router.navigate(['/']);
            },
            error: () => {
              this.router.navigate(['/']);
            }
          });
          

          
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
                console.error('Error fetching user info', err);
                this.router.navigate(['/']);
              }
            });
        },
        error: err => {
          this.error = err.error?.error || 'Login failed';
          this.message = '';
        }
      });
  }
}
