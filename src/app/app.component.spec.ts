/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FilmListComponent} from "./film-list/film-list.component";
import {FilmService} from "./film-list/film.service";
import {Observable} from "rxjs";
import {Film} from "./film-list/film";

class MockFilmService extends FilmService {
  subscribeToFilms(): Observable<Film[]> {
    return Observable.of([new Film('Jason Bourne', 'London pictures', 'http://1', 'http://2')]);
  }
  getCompanies(): Array<string> {
    return ['Handmade'];
  }
}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FilmListComponent
      ],
      providers: [{provide: FilmService, useClass: MockFilmService}]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have correct title `, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Film demo');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Film demo');
  }));
});
