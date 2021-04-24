import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IFork } from 'src/app/infrastructure/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ForksService {

  constructor(
    private http: HttpClient
  ) { }

  public getForks(info): Observable<IFork[]> {
    const owner = info.owner;
    const repository = info.repository;
    const requestUrl = `https://api.github.com/repos/${owner}/${repository}/forks`;
    return this.http.get<IFork[]>(requestUrl);
  }

  public addFavorit(forkId?) {
    localStorage.setItem('forkId', forkId);
  }
}
