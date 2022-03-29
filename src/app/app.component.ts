import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private currentTheme = 'light-theme';
  public showLoading!: Observable<boolean>;

  get isDarkMode(): boolean {
    return this.currentTheme === 'dark-theme';
  }

  constructor(
      private store: Store<AppState>,
      private translateService: TranslateService,
      @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2
    ) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
  
  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  switchMode(isDarkMode: boolean) {
    this.currentTheme = isDarkMode ? 'dark-theme' : 'light-theme';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }
}
