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
      } else {
        console.log(this.user);
        this.user = authState.user;
        this.greeting = "Hello " + this.user.username;
        this.router.navigate(['/home'])
      }
    });
  }

  store() {
    console.log('button click');
    this.amplifyService.storage().put('test.txt', 'Hello1')
    .then (result => console.log(result)) // {key: "test.txt"}
    .catch(err => console.log(err));
  }

  get() {
    this.amplifyService.storage().get('test.txt')
    .then(result => {
      console.log(result)
      var request = new XMLHttpRequest()

      request.open('GET', result, true)
      request.onload = function() {
        // Begin accessing JSON data here
        
        console.log(this.response);
        
      }
      request.send()
    })
    .catch(err => console.log(err));
  }
}
