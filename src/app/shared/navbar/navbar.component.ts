import { Component, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{
  public isDarkThemeActive: boolean = false;
  @Output()
  readonly darkModeEmitter = new EventEmitter<boolean>();

  public searchBarForm = new FormGroup({
    searchBar: new FormControl(),
    searchButton: new FormControl()
  });

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> = new Observable();

  constructor() {}

  toggleDarkTheme(): void {
    this.isDarkThemeActive = !this.isDarkThemeActive;
    this.darkModeEmitter.emit(this.isDarkThemeActive);
  }

  onSubmit() {}


  ngOnInit() {
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
}
