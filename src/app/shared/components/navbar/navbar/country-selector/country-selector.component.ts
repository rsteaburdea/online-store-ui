import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getAvailableLanguages, getCurrentLanguage, getDefaultLanguage } from 'src/app/store/shared/shared.selector';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
})
export class CountrySelectorComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  public readonly availableLanguages$: Observable<(string)[]> = this.store.select(getAvailableLanguages);

  constructor(private store: Store<AppState>,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.loadLanguage();
  }

  private loadLanguage(): void {
    this.store.select(getCurrentLanguage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((language: string) => {
        if (language) {
          this.translateService.setDefaultLang(language);
          this.translateService.use(language);
        }
      });
  }

  public changeLanguage(language: string) {
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);
  }
  
  ngOnDestroy(): void {
      this.destroy$.next({});
      this.destroy$.complete();
  }
}
