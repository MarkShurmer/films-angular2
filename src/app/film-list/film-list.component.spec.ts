/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {FilmListComponent} from './film-list.component';
import {FilmService} from './film.service';
import {Observable} from 'rxjs';
import {Film} from './film';

class MockFilmService {
  subscribeToFilms(): Observable<Film[]> {
    return Observable.of([new Film('Banana', 'London pictures', 'http://1', 'http://2')]);
  }
  getCompanies(): Array<string> {
    return ['Pixar'];
  }
}

describe('FilmListComponent', () => {
  let component: FilmListComponent;
  let fixture: ComponentFixture<FilmListComponent>;
  let mockFilmService: MockFilmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilmListComponent],
      providers: [{provide: FilmService, useClass: MockFilmService}] // pass in our mock
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockFilmService = fixture.debugElement.injector.get(FilmService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(mockFilmService.subscribeToFilms).toHaveBeenCalled();
  });

  it('should use service when asked for films', () => {

    expect(component).toBeTruthy();
  });

});
