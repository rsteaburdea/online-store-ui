import { Component, OnInit } from '@angular/core';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  faGoogle = faGoogle;
  faFacebook = faFacebookF;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  public googleSignIn(): void {
    
  }
}
