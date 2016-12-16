/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmListComponent} from './film-list.component';
import {FilmService} from './film.service';
import {Observable} from 'rxjs';
import {Film} from './film';

class MockFilmService extends FilmService {
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
    mockFilmService = fixture.debugElement.injector.get(FilmService);
    // spy on mocks so we know they have been called
    spyOn(mockFilmService, 'subscribeToFilms').and.callThrough();
    spyOn(mockFilmService, 'getCompanies').and.callThrough();

    // connects everything
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call subscribe to films', () => {
    // done in ngInit
    expect(mockFilmService.subscribeToFilms).toHaveBeenCalled();
  });

  it('should use service when asked for films', () => {
    // done in ngInit
    expect(mockFilmService.getCompanies).toHaveBeenCalled();
  });

});
