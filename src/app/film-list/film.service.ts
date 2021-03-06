import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Film} from './film';


@Injectable()
export class FilmService {
  private companies: Array<string>;

  constructor(private http: Http) {
  }

  subscribeToFilms(): Observable<Film[]> {
    return this.http.get('app/data/films.json')
      .map((resp: Response) => {
        let films: Array<Film> = resp.json() || {};
        // now we have films , build companies
        this.buildCompanies(films);
        // sort using name comparator
        return films.sort(this.nameComparator);
      }) // we want the json served
      .catch(this.errorHandler); // deal with errors
  }

  getCompanies(): Array<string> {
    return this.companies;
  }

  private nameComparator(lhs: Film, rhs: Film) {
    // do simple comparisons
    if(lhs.name < rhs.name) {
      return -1;
    }

    if(lhs.name > rhs.name) {
      return 1;
    }

    return 0;
  }

  private buildCompanies(filmData: Array<Film>): void {
    // get all distinct comapnies
    let allCompanies = filmData.map(f => f.company);
    this.companies = allCompanies.filter((x, i, a) => a.indexOf(x) == i);
  }

  private errorHandler(error: Response | any) {
    // split out the error
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
