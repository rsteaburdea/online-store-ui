import { Component, OnInit } from '@angular/core';
import { faFacebook, faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  faGoogle = faGoogle;
  faFacebook = faFacebookF;
  constructor() { 
  }

  ngOnInit(): void {
  }

}
