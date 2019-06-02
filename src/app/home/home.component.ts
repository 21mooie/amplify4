import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signedIn: boolean;
  user: any;

  constructor(
    private amplifyService: AmplifyService
  ) { }

  ngOnInit() {
    this.amplifyService.authStateChange$
    .subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (!authState.user) {
        this.user = null;
      } else {
        console.log(this.user);
        this.user = authState.user;
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
