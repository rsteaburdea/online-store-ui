import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme = false;

  constructor(private translateService: TranslateService ) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
  
  ngOnInit(): void {
  }

  switchMode(isDarkTheme: boolean) {
    this.isDarkTheme = isDarkTheme;
  }
}
