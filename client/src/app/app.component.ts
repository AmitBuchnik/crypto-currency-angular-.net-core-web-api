import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { CryptoCurrencyModel } from './crypto-currenecy.model';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('table') table: Table;

  reactiveForm: FormGroup;
  cryptoCurrencies$: Observable<CryptoCurrencyModel[]>;

  sortOptions = [
    { name: 'Price (USD)', code: 'metrics.market_data.price_usd' },
    { name: 'Market Cap (USD)', code: 'metrics.marketcap.current_marketcap_usd' }
  ];

  constructor(private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private dataService: DataService) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.initForm();
  }

  getData() {
    this.cryptoCurrencies$ = this.dataService.getCryptoCurrencyData(this.reactiveForm.value.numRecords);
  }

  ngOnDestroy(): void {
  }

  initForm() {
    let controlConfig = this.getControlConfig();
    this.reactiveForm = this.fb.group(controlConfig, {
      validators: []
    });
  }

  getControlConfig(): any {
    let config = {
      option: [null, [] as any[]],
      numRecords: [20, [Validators.required]]
    };
    return config;
  }

  onSubmit() {
    this.cryptoCurrencies$ = this.dataService.getCryptoCurrencyData(this.reactiveForm.value.numRecords);
  }

  onSelectSortBy() {
    this.sortTable();
  }

  sortTable() {
    // this.table.sortField = this.table.columns.find(col => col.field === paginationOptions.SortColumn);
    this.table.sortField = this.reactiveForm.value.option;
    this.table.sortSingle();
  }
}
