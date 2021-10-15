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
  displayedColumns = ['code', 'nameRu'];

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
    forkJoin({
      units: this.unitService.getAll(),
      links: this.unitToUnitService.getAll(),
      old: this.bankDataService.getAll()
    }).subscribe(value => {
      var event = new Date();
      var dateString = event.toISOString().split("T")[0];
      console.log(dateString);

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

  refreshCourses(){
    this.bankDataService.getAll().subscribe(value => {
      let jsonToString = JSON.stringify(value.Valute)
      let dd = JSON.parse(jsonToString);
      var data = new Date(2021,10,12);
      data.setDate(data.getDate()+1);
      data.setMonth(data.getMonth()-1);
      var dateString = data.toISOString().split("T")[0];
      // console.log(dateString);
      var id = this.units.find(value1 => value1.code === 'RU');
      for (let ddKey in dd) {
        // console.log(dd[ddKey].Value);
        this.newLinks.push(
          {
            value: Number((1/dd[ddKey].Value).toFixed(6)),
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
      // console.log(this.newLinks);
        // this.unitToUnitService.createlist(this.newLinks).subscribe(value1 => {
        //   console.log(value1);
        // });
    })
  }

  getByDate( event: Date){
    event.setDate(event.getDate()+1)
    event.setMonth(event.getMonth())
    var dateString = event.toISOString().split("T")[0];
    console.log(dateString);
    this.unitToUnitService.getByDate(dateString).subscribe(value => {
      console.log(value);
    })
  }
}
