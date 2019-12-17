import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {

  @Output() valueChange: EventEmitter<{
    text: string, minEtcs: number, maxEtcs: number,
    minRating: number, maxRating: number, semesters: any[]
  }> = new EventEmitter();

  constructor(
  ) { }

  searchText = '';
  public selectedSemester = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  minValueEtcs = 0;
  maxValueEtcs = 10;
  optionsEtcs: Options = {
    floor: 0,
    ceil: 15,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min ETCS: </b> ' + value;
        case LabelType.High:
          return '<b>Max ETCS: </b>' + value;
        default:
          return '' + value;
      }
    }
  };

  minValueRating = 0;
  maxValueRating = 5;
  optionsRating: Options = {
    floor: 0,
    ceil: 5,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min Rating: </b> ' + value;
        case LabelType.High:
          return '<b>Max Rating: </b>' + value;
        default:
          return '' + value;
      }
    }
  };

  @ViewChild('multiSelect', { static: false }) multiSelect;
  public form: FormGroup;
  public loadContent = false;
  public name = 'Cricketers';
  public data = [];
  public settings = {};

  ngOnInit() {
    this.data = [
      { item_id: 1, item_text: '1' },
      { item_id: 2, item_text: '2' },
      { item_id: 3, item_text: '3' },
      { item_id: 4, item_text: '4' },
      { item_id: 5, item_text: '5' },
      { item_id: 6, item_text: '6' },
      { item_id: 7, item_text: '7' },
      { item_id: 8, item_text: '8' },
      { item_id: 9, item_text: '9' },
      { item_id: 10, item_text: '10' }
    ];
    // setting and support i18n
    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 5,
      noDataAvailablePlaceholderText: '',
      searchPlaceholderText: 'Select Semester',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.setForm();
  }

  public setForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data, Validators.required)
    });
    this.loadContent = true;
  }

  get f() { return this.form.controls; }

  public save() {
  }

  public onFilterChange(item: any) {
  }

  public onItemSelect(item: any) {
    this.selectedSemester.push(item.item_id);
    this.onSearchChange();

  }

  public onDeSelect(item: any) {
    for (let i = 0; i < this.selectedSemester.length; i++) {
      if (this.selectedSemester[i] === item.item_id) {
        this.selectedSemester.splice(i, 1);
        i--;
      }
    }
    this.onSearchChange();
  }

  public onSelectAll(items: any) {
    this.selectedSemester = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.onSearchChange();
  }

  public onDeSelectAll(items: any) {
    this.selectedSemester = items;
    this.onSearchChange();
  }

  public onSearchChange() {
    this.valueChange.emit({
      text: this.searchText, minEtcs: this.minValueEtcs, maxEtcs: this.maxValueEtcs, minRating: this.minValueRating,
      maxRating: this.maxValueRating, semesters: this.selectedSemester
    });
  }

  public onSearchText(searchValue: string) {
    this.searchText = searchValue;
    this.valueChange.emit({
      text: searchValue, minEtcs: this.minValueEtcs, maxEtcs: this.maxValueEtcs, minRating: this.minValueRating,
      maxRating: this.maxValueRating, semesters: this.selectedSemester
    });
  }
}
