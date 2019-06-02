import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify4';
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
  constructor( private amplifyService: AmplifyService ) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.signedIn = authState.state === 'signedIn';
        if (!authState.user) {
          this.user = null;
        } else {
          console.log(this.user);
          this.user = authState.user;
          this.greeting = "Hello " + this.user.username;
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
