import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signedIn: boolean;
  user: any;

  constructor(
    private amplifyService: AmplifyService,
    private router: Router
  ) { }

  ngOnInit() {}

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

  signOut() {
    let user = this.user;
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    console.log(this.user);
    this.router.navigate(['']);
  }

}
