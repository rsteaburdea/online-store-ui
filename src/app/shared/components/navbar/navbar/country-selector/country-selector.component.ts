import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IpInfoResponse } from 'src/app/models/ip.info.response.data';
import { AppState } from 'src/app/store/app.state';
import { getAvailableLanguages, getIpInfo } from 'src/app/store/shared/shared.selector';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
})
export class CountrySelectorComponent implements OnInit, OnDestroy {
  public readonly availableLanguages$: Observable<(string)[]> = this.store.select(getAvailableLanguages);
  private readonly destroy$ = new Subject();


  constructor(private store: Store<AppState>,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.loadLanguage();
  }

  private loadLanguage(): void {
    this.store.select(getIpInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe((ipInfo: IpInfoResponse | null) => {
        if (ipInfo && ipInfo.location) {
          const language = ipInfo.location?.language.code.toLowerCase();
          this.translateService.setDefaultLang(language);
          this.translateService.use(language);
        }
      });
  }

  public changeLanguage(language: string): void {
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
  }

  ngOnDestroy(): void {
      this.destroy$.next({});
      this.destroy$.complete();
  }
}
