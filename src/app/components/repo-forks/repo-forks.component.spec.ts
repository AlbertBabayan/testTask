import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoForksComponent } from './repo-forks.component';

describe('RepoForksComponent', () => {
  let component: RepoForksComponent;
  let fixture: ComponentFixture<RepoForksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoForksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoForksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
