import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UnitService} from "../../../services/unit.service";
import {Unit} from "../../../models/unit";
import {UnitToUnitService} from "../../../services/unit-to-unit.service";
import {forkJoin} from "rxjs";
import {UnitToUnit} from "../../../models/unit-to-unit";
import {BankDataService} from "../../../services/get-data-from-bank.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

export class IUnit {
  code: string;
  name: string;
  value: number;
  value1prev: string;
  value2prev: string;
}

@Component({
  selector: 'app-exchange-card',
  templateUrl: './exchange-card.component.html',
  styleUrls: ['./exchange-card.component.css']
})
export class ExchangeCardComponent implements OnInit {
  code: string = 'RU';
  dayBack1: Date = new Date();
  dayBack2: Date = new Date();
  selectedDate: Date = new Date();
  units: Array<Unit> = [];
  links: Array<UnitToUnit> = [];
  newLinks: Array<UnitToUnit> = [];
  dataSource: Array<IUnit> = [];
  dataToMove: Array<IUnit> = [];
  isLoad: boolean = true;
  displayedColumns = ['code', 'name', 'value', 'value1prev', 'value2prev'];

  constructor(
    private router: Router,
    private unitService: UnitService,
    private unitToUnitService: UnitToUnitService,
    private bankDataService: BankDataService,
  ) {

  }


  ngOnInit(): void {
    this.isLoad = false;
    this.selectedDate = new Date();
    this.dayBack1.setDate(this.selectedDate.getDate() - 1);
    this.dayBack2.setDate(this.selectedDate.getDate() - 2);

    const dateString = this.selectedDate.toISOString().split("T")[0];
    const dateString1 = this.dayBack1.toISOString().split("T")[0];
    const dateString2 = this.dayBack2.toISOString().split("T")[0];
    this.getAll(dateString, dateString1, dateString2);
  }

  getAll(dateSelected: string, date1: string, date2: string) {

    forkJoin({
      units: this.unitService.getAll(),
      links: this.unitToUnitService.getByDateCode(dateSelected, this.code),
      linksOneDay: this.unitToUnitService.getByDateCode(date1, this.code),
      linksThoDays: this.unitToUnitService.getByDateCode(date2, this.code),
      old: this.bankDataService.getAll()
    }).subscribe(value => {
      this.dataToMove = [];
      if (value.links.length < 1 && this.code == "RU") {
        this.refreshCourses();
      } else {
        this.links = value.links;
      }
      this.links.forEach(conv => {
        var co = new IUnit();
        co.code = conv.id.firstUnitId.code;
        co.name = conv.id.firstUnitId.nameRu;
        co.value = conv.value;
        if (value.linksOneDay.length > 0) {
          // @ts-ignore
          co.value1prev = value.linksOneDay.find(value => value.id.firstUnitId.code === conv.id.firstUnitId.code).value
        }
        if (value.linksThoDays.length > 0) {
          // @ts-ignore
          co.value2prev = value.linksThoDays.find(value => value.id.firstUnitId.code === conv.id.firstUnitId.code).value
        }
        this.dataToMove.push(co);

      })
      this.dataSource = this.dataToMove;
      this.units = value.units;
      this.isLoad = true;

    })
  }

  refreshCourses() {
    this.isLoad = false;
    // @ts-ignore
    const dateString = this.selectedDate?.getFullYear() + '-' + this.convertData(this.selectedDate?.getMonth() + 1, 2) + '-' + this.convertData(this.selectedDate.getDate(), 2);
    const checkDate = new Date();
    // @ts-ignore
    const checkDateString = checkDate?.getFullYear() + '-' + this.convertData(checkDate?.getMonth() + 1, 2) + '-' + this.convertData(checkDate.getDate(), 2);

    if (checkDateString == dateString) {
      this.bankDataService.getAll().subscribe(value => {
        let jsonToString = JSON.stringify(value.Valute);
        let dd = JSON.parse(jsonToString);

        const id = this.units.find(value1 => value1.code === 'RU');
        for (let ddKey in dd) {
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
          this.links = value1
          this.isLoad = true;
        });
      })
    } else if (this.selectedDate != null && this.selectedDate <= checkDate) {
      // @ts-ignore
      const dateToString = this.selectedDate?.getFullYear() + '/' + this.convertData(this.selectedDate?.getMonth() + 1, 2) + '/' + this.convertData(this.selectedDate.getDate(), 2);

      this.bankDataService.getAllByDate(dateToString).subscribe(value => {
        let jsonToString = JSON.stringify(value.Valute)
        let dd = JSON.parse(jsonToString);

        const id = this.units.find(value1 => value1.code === 'RU');
        for (let ddKey in dd) {
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
          this.links = value1
          this.isLoad = true;
        });
      })
    }

  }

  getByDate(event: Date) {
    this.isLoad = false;
    this.selectedDate = event;
    const dateToString = this.selectedDate?.getFullYear() + '-' + this.convertData(this.selectedDate?.getMonth() + 1, 2) + '-' + this.convertData(this.selectedDate.getDate(), 2);
    const dateToString1 = this.selectedDate?.getFullYear() + '-' + this.convertData(this.selectedDate?.getMonth() + 1, 2) + '-' + this.convertData(this.selectedDate.getDate() - 1, 2);
    const dateToString2 = this.selectedDate?.getFullYear() + '-' + this.convertData(this.selectedDate?.getMonth() + 1, 2) + '-' + this.convertData(this.selectedDate.getDate() - 2, 2);
    this.getAll(dateToString, dateToString1, dateToString2);
  }

  // @ts-ignore
  convertData(val, resultLength = 2, innerChar = '0'): string {
    return (String(innerChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }

  changeCode() {
    this.isLoad = false;
    const dateToString = this.selectedDate?.getFullYear() + '-' + this.convertData(this.selectedDate?.getMonth() + 1, 2) + '-' + this.convertData(this.selectedDate.getDate(), 2);
    const dateToString1 = this.selectedDate?.getFullYear() + '-' + this.convertData(this.selectedDate?.getMonth() + 1, 2) + '-' + this.convertData(this.selectedDate.getDate() - 1, 2);
    const dateToString2 = this.selectedDate?.getFullYear() + '-' + this.convertData(this.selectedDate?.getMonth() + 1, 2) + '-' + this.convertData(this.selectedDate.getDate() - 2, 2);
    this.getAll(dateToString, dateToString1, dateToString2);
  }
}
