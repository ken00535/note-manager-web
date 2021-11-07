import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountUnit } from 'src/app/model/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public showLoginFailGeneralMessage: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  login() {
    let account = new AccountUnit(
      this.username.value,
      this.password.value
    )
    this.accountService.login(account)
      .subscribe({
        next: () => {
          this.router.navigate(['/notes']);
        },
        error: err => {
          this.loginFailedTrigger(err);
        }
      })
  }

  loginFailedTrigger(message: string) {
    this.showLoginFailGeneralMessage = true;
    console.log('loginFailedTrigger Status: ' + message);
  }

}
