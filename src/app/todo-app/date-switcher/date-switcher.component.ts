import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'todo-date-switcher',
  templateUrl: './date-switcher.component.html',
  styleUrls: ['./date-switcher.component.scss']
})
export class DateSwitcherComponent implements OnInit {

  currDate = { raw: null, formatted: null }

  @Output() onDateChange = new EventEmitter();

  constructor() {
    this._dateChanges()
  }

  ngOnInit() { }

  yesterday() {
    const date = this._getCurrMoment().subtract(1, 'd')
    this._dateChanges(date)
  }
  
  tomorrow() {
    const date = this._getCurrMoment().add(1, 'd')
    this._dateChanges(date)
  }

  datepickerChange(e) {
    if (e != '') this._dateChanges(e)
  }

  private _getCurrMoment(){
    const { formatted } = this.currDate
    return moment(formatted)
  }

  private _dateChanges(date = null){
    const raw = date ? moment(date) : moment()
    const formatted = raw.format('YYYY-MM-DD')
    this.currDate = { raw, formatted }
    this.onDateChange.emit(this.currDate)
  }

}
