import { Component, ChangeDetectionStrategy, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, startWith } from 'rxjs';
import { autoLogout } from 'src/app/auth/state/auth.actions';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AppState } from 'src/app/store/app.state';
import { switchDarkTheme } from 'src/app/store/shared/shared.actions';
import { isDarkThemeEnabled } from 'src/app/store/shared/shared.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{
  public isDarkMode!: Observable<boolean>;
  @Output()
  private isAuthenticated!: Observable<boolean>;

  public searchBarForm = new FormGroup({
    searchBar: new FormControl(),
    searchButton: new FormControl()
  });

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> = new Observable();

  constructor(private store: Store<AppState>) {}

  toggleDarkTheme(): void {
    this.store.dispatch(switchDarkTheme());
  }

  onSubmit() {}


  ngOnInit() {
    this.isDarkMode = this.store.select(isDarkThemeEnabled);
    this.isAuthenticated = this.store.select(isAuthenticated);
    if (this.searchBarForm !== null && this.searchBarForm.get('searchBar') !== null) {
      //@ts-ignore
      this.filteredOptions = this.searchBarForm.get('searchBar')
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
