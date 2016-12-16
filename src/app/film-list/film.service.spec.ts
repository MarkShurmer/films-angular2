/* tslint:disable:no-unused-variable */
import {TestBed, async, inject} from '@angular/core/testing';
import {FilmService} from './film.service';
import {
  Response, ResponseOptions, Http, HttpModule,
  BaseRequestOptions
} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";

let respBody = [
  {
    "name": "Cars",
    "company": "Pixar",
    "url": "http://www.imdb.com/title/tt0317219/?ref_=nv_sr_1",
    "image": "http://ia.media-imdb.com/images/M/MV5BMTE5Mzk5MTA2Ml5BMl5BanBnXkFtZTYwNTY3NTc2._V1_SY317_CR0,0,214,317_AL_.jpg"
  },
  {
    "name": "How to Train Your Dragon",
    "company": "Dreamworks",
    "url": "http://www.imdb.com/title/tt0892769/?ref_=nv_sr_2",
    "image": "http://ia.media-imdb.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_SX214_AL_.jpg"
  }];

describe('FilmService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [FilmService, MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions],
        }],
      imports: [HttpModule]
    });

    let backend = TestBed.get(MockBackend);

    // mock the response
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(respBody)
          })));
      });

    TestBed.compileComponents();
  }));

  it('should create', inject([FilmService], (service: FilmService) => {
    expect(service).toBeTruthy();
  }));

  it('should call get on subscribe to films', inject([FilmService, Http], (service: FilmService, http: Http) => {
    spyOn(http, 'get').and.callThrough(); // call the mock method
    service.subscribeToFilms();

    expect(http.get).toHaveBeenCalled();
  }));

  it('should get company list on getCompanies()', async(inject([FilmService, Http], (service: FilmService, http: Http) => {
    spyOn(http, 'get').and.callThrough(); // call the mock method
    // subscribe then check companies
    service.subscribeToFilms()
      .subscribe(r => {
        let results = service.getCompanies();

        expect(results.length).toBe(2);
        expect(results[0]).toBe('Pixar');
        expect(results[1]).toBe('Dreamworks');
      });

  })));
});
