import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signedIn: boolean;
  user: any;
  greeting: string;
  signUpConfig = {
    signUpFields: [
      {
      label:'Email Address',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string',
      custom: false
      },
      {
        label: 'Name',
        key: 'name',
        required: true,
        displayOrder: 2,
        type: 'string',
        custom: false
      }
    ],
    hiddenDefaults: ['phone_number']
  }
  constructor( 
    private amplifyService: AmplifyService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.amplifyService.authStateChange$
    .subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (!authState.user) {
        this.user = null;
        console.log('not signed in anymore');
      } else {
        console.log(this.user);
        this.user = authState.user;
        this.greeting = "Hello " + this.user.username;
        this.router.navigate(['/home'])
      }
    });
  }
}
