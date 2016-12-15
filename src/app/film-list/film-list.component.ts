import {Component, OnInit} from '@angular/core';
import {FilmService} from './film.service';
import {Film} from './film';
import {distinct} from 'rxjs/operator/distinct';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  films: Array<Film>;
  filteredFilms: Array<Film>;
  companies: Array<string>;
  errorMessage: string;

  constructor(private filmService: FilmService) {
  }

  ngOnInit() {
    // get the data
    this.filmService.subscribeToFilms()
      .subscribe(
        (films) => {
          // films have been retrieved
          this.films = films;
          this.filteredFilms = films;
          // get companies as well, prepend filter clear
          this.companies = ['<None>'].concat(this.filmService.getCompanies());
        },
        error => this.errorMessage = error
      );

  }

  changeFilter(value: string) {
    if (value === '<None>') {
      // show whole list
      this.filteredFilms = this.films;
    } else {
      // filter it manually
      this.filteredFilms = this.films.filter(film => film.company === value);
    }
  }
}
