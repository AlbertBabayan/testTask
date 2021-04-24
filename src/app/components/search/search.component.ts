import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IInfo } from 'src/app/infrastructure/interfaces';
import { nameFormat } from 'src/app/infrastructure/validators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<IInfo>();
  public searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  public onSearch() {
    const formValue = this.searchForm.get('ownerAndRepoName').value;
    const owner = formValue.slice(0, formValue.indexOf('/'));
    const repository = formValue.slice(formValue.indexOf('/') + 1);
    this.search.emit({owner, repository});
  }

  private formInit() {
    this.searchForm = this.formBuilder.group({
      ownerAndRepoName: ['', [nameFormat()]],
    });
  }
}
