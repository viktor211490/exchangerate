import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UnitService} from "../../../services/unit.service";
import {Unit} from "../../../models/unit";
import {UnitToUnitService} from "../../../services/unit-to-unit.service";
import {forkJoin} from "rxjs";
import {UnitToUnit} from "../../../models/unit-to-unit";
import {BankDataService} from "../../../services/get-data-from-bank.service";

export interface IUnit {
  id: string;
  image: string;
  code: string;
  nameRu: string;
}

@Component({
  selector: 'app-exchange-card',
  templateUrl: './exchange-card.component.html',
  styleUrls: ['./exchange-card.component.css']
})
export class ExchangeCardComponent implements OnInit {
  selectedDate: Date | null;
  selected1 = "RU";
  select1Value = "1";
  selected2 = "USD";
  select2Value = "1";
  units: Array<Unit> = [];
  links: Array<UnitToUnit> = [];
  newLinks: Array<UnitToUnit> = [];
  dataSource: IUnit[];
  isLoad: boolean = true;
  displayedColumns = ['code', 'nameRu', 'value'];

  constructor(
    private router: Router,
    private unitService: UnitService,
    private unitToUnitService: UnitToUnitService,
    private bankDataService: BankDataService,
  ) {

  }

  isAdmin() {
    return this.router.url.includes("admin");

  }

  ngOnInit(): void {
    this.isLoad = false;
    this.selectedDate = new Date();
    var dateString = this.selectedDate.toISOString().split("T")[0];
    console.log(dateString);
    forkJoin({
      units: this.unitService.getAll(),
      links: this.unitToUnitService.getByDate(dateString),
      old: this.bankDataService.getAll()
    }).subscribe(value => {


      this.units = value.units;
      this.links = value.links;
      // console.log(this.links);

      // console.log(value.old);

    })
    this.unitService.getAll().subscribe(value => {
      this.units.push(value);
      this.dataSource = value;
      this.isLoad = true;

    })
  }

  refreshCourses() {
    // @ts-ignore
    var dateString = this.selectedDate?.getFullYear() + '-' + this.leftpad(this.selectedDate?.getMonth() + 1, 2) + '-' + this.leftpad(this.selectedDate.getDate(), 2);
    var checkDate = new Date();
    // @ts-ignore
    var checkDateString = checkDate?.getFullYear() + '-' + this.leftpad(checkDate?.getMonth() + 1, 2) + '-' + this.leftpad(checkDate.getDate(), 2);

    if (checkDateString == dateString) {
      this.bankDataService.getAll().subscribe(value => {
        let jsonToString = JSON.stringify(value.Valute)
        let dd = JSON.parse(jsonToString);

        var id = this.units.find(value1 => value1.code === 'RU');
        for (let ddKey in dd) {
          // console.log(dd[ddKey].Value);
          this.newLinks.push(
            {
              value: Number((dd[ddKey].Nominal / dd[ddKey].Value).toFixed(6)),
              id: {
                date: dateString,
                // @ts-ignore
                firstUnitId: this.units.find(value1 => value1.code === ddKey),
                // @ts-ignore
                secondUnitId: id,
              },
            }
          )
        }

        this.unitToUnitService.createlist(this.newLinks).subscribe(value1 => {
          console.log(value1);
        });
      })
    } else if (this.selectedDate != null && this.selectedDate <= checkDate) {
      // @ts-ignore
      var dateToString = this.selectedDate?.getFullYear() + '/' + this.leftpad(this.selectedDate?.getMonth() + 1, 2) + '/' + this.leftpad(this.selectedDate.getDate(), 2);

      this.bankDataService.getAllByDate(dateToString).subscribe(value => {
        let jsonToString = JSON.stringify(value.Valute)
        let dd = JSON.parse(jsonToString);

        var id = this.units.find(value1 => value1.code === 'RU');
        for (let ddKey in dd) {
          // console.log(dd[ddKey].Value);
          this.newLinks.push(
            {
              value: Number((dd[ddKey].Nominal / dd[ddKey].Value).toFixed(6)),
              id: {
                date: dateString,
                // @ts-ignore
                firstUnitId: this.units.find(value1 => value1.code === ddKey),
                // @ts-ignore
                secondUnitId: id,
              },
            }
          )
        }

        this.unitToUnitService.createlist(this.newLinks).subscribe(value1 => {
          console.log(value1);
        });
      })
    }

  }

  getByDate(event: Date) {
    this.isLoad = false;
    this.selectedDate = event;
    console.log(this.selectedDate);
    var dateString = this.selectedDate?.getFullYear() + '-' + this.leftpad(this.selectedDate?.getMonth() + 1, 2) + '-' + this.leftpad(this.selectedDate.getDate(), 2);
    console.log(dateString);
    this.unitToUnitService.getByDate(dateString).subscribe(value => {
      this.links = value;
      this.isLoad = true;
    })
  }

  // @ts-ignore
  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
}
