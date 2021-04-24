import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ForksService } from 'src/app/services';
import { IFork, IInfo } from 'src/app/infrastructure/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-repo-forks',
  templateUrl: './repo-forks.component.html',
  styleUrls: ['./repo-forks.component.scss']
})
export class RepoForksComponent implements OnInit, OnDestroy {
  public page = 1;
  public pageSize = 10;
  public favorit = false;
  public repositoryName: string;
  public collectionSize: number;
  public forks: IFork[];
  public allForks: IFork[];
  public selectPerPage = [10, 15, 20];
  private ngUnsubscribe = new Subject();

  constructor(
    private forksSvc: ForksService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: resp => {
          const filters = {
            owner: resp.owner,
            repository: resp.repository
          };
          this.repositoryName = resp.repository;
          this.getForks(filters); // to do owner and repo change
        },
        error: err => {
          this.toastr.error(err.error.message, 'Error');
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public refreshForks() {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        page: this.page,
        perPage: this.pageSize
      },
      queryParamsHandling: 'merge'
    });
    this.forks = this.allForks.slice(this.pageSize * (this.page - 1), this.pageSize * this.page);
  }

  public getForks(filters) {
    this.forksSvc.getForks(filters)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: res => {
          this.allForks = res;
          this.collectionSize = this.allForks.length;
          this.forks = this.allForks.slice(this.pageSize * (this.page - 1), this.pageSize * this.page);
        },
        error: err => {
          this.toastr.error(err.error.message, 'Error');
        }
      });
  }

  public onSearch({ owner, repository }: IInfo) {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        owner,
        repository
      },
      queryParamsHandling: 'merge'
    });
  }
}
