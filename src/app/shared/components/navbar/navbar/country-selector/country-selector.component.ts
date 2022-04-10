import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { updateCurrentLanguage } from 'src/app/store/shared/shared.actions';
import { getAvailableLanguages } from 'src/app/store/shared/shared.selector';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
})
export class CountrySelectorComponent implements OnInit {
  public readonly availableLanguages$: Observable<(string)[]> = this.store.select(getAvailableLanguages);
  private readonly destroy$ = new Subject();


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { }

  public changeLanguage(language: string): void {
    this.store.dispatch(updateCurrentLanguage({ language }));
  }
}
