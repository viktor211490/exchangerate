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
    // this.bankDataService.getAll().subscribe(value => {
    //   let toDo = JSON.stringify(value.rates)
    //   let dd = JSON.parse(toDo);
    //
    //   var dateString = new Date().toISOString().split("T")[0];
    //
    //     var id = this.units.find(value1 => value1.code === 'RU');
    //   this.newLinks = [];
    //   for (let ddKey in dd) {
    //
    //     // // @ts-ignore
    //
    //     this.newLinks.push(
    //       {
    //         value: dd[ddKey],
    //         id: {
    //           date: dateString,
    //           // @ts-ignore
    //           firstUnitId: this.units.find(value1 => value1.code === ddKey),
    //           // @ts-ignore
    //           secondUnitId: id,
    //         },
    //       }
    //     )
    //   }
    //
    //   // console.log(this.newLinks);
    //   // TODO: Добавить адекватный вызов
    //   // this.unitToUnitService.createlist(this.newLinks).subscribe(value1 => {
    //   //   console.log(value1);
    //   // });
    // })
    this.bankDataService.getAll().subscribe(value => {
      let jsonToString = JSON.stringify(value.Valute)
      let dd = JSON.parse(jsonToString);
      var dateString = new Date(2021,10,14).toISOString().split("T")[0];
      console.log(dateString);
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
      console.log(this.newLinks);
        this.unitToUnitService.createlist(this.newLinks).subscribe(value1 => {
          console.log(value1);
        });
    })
  }
}
