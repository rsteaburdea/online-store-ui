import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject, takeUntil, zip } from 'rxjs';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { getLoading, isDarkThemeEnabled } from './store/shared/shared.selector';
import { ConfigService } from './services/config.service';
import { IpService } from './services/ip.service';
import { Config } from './models/config.model'
import { loadIpInfo } from './store/shared/shared.actions';
import { IpInfoConfig } from './models/ip.info.config.model';
import { IpInfoResponse } from './models/ip.info.response.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  public showLoading!: Observable<boolean>;
  
  private currentTheme = 'light-theme';
  get isDarkMode(): boolean {
    return this.currentTheme === 'dark-theme';
  }

  constructor(
    private store: Store<AppState>,
    private configService: ConfigService,
    private ipService: IpService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadIpInfo();
    this.themeSwitcher();
  }

  private loadIpInfo(): void {
    this.configService.getConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config: Config) => {
        const ipInfoConfig: IpInfoConfig = config.ipConfig;
        this.store.dispatch(loadIpInfo({ ipInfoConfig }));
      })
  }

  private themeSwitcher(): void {
    this.store.select(isDarkThemeEnabled).subscribe((isDarkMode) => {
      this.switchMode(isDarkMode);
    });
    this.showLoading = this.store.select(getLoading);
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  private switchMode(isDarkMode: boolean) {
    this.currentTheme = isDarkMode ? 'dark-theme' : 'light-theme';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
