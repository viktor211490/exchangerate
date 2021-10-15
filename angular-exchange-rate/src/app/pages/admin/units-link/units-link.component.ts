import { Component, OnInit } from '@angular/core';
import {UnitToUnitService} from "../../../../services/unit-to-unit.service";
import {UnitToUnit} from "../../../../models/unit-to-unit";

@Component({
  selector: 'app-units-link',
  templateUrl: './units-link.component.html',
  styleUrls: ['./units-link.component.css']
})
export class UnitsLinkComponent implements OnInit {

  links: Array<UnitToUnit>= [];
  selectedDate: Date | null;

  constructor(
    public unitToUnitService: UnitToUnitService,
  ) { }

  ngOnInit(): void {
    this.selectedDate = new Date();
    var dateString = this.selectedDate.toISOString().split("T")[0];
    this.unitToUnitService.getByDate(dateString).subscribe(value => {
      this.links = value;
    })
  }

}
