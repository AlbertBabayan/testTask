import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ForksService } from 'src/app/services';
import { IInfo } from '../../infrastructure/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  constructor(
    private router: Router,
    private forksSvc: ForksService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSearch({ owner, repository }: IInfo) {
    this.forksSvc.getForks({ owner, repository })
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: resp => {
          this.router.navigate(['forks'], { queryParams: { owner, repository, page: 1, perPage: 10 } });
        },
        error: err => {
          this.toastr.error(err.error.message, 'Error');
        }
      });
  }
}
