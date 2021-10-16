import { Component, OnInit } from '@angular/core';
import {UnitToUnitService} from "../../../../services/unit-to-unit.service";
import {UnitToUnit, UnitToUnitId} from "../../../../models/unit-to-unit";
import {MatDialog} from "@angular/material/dialog";
import {Unit} from "../../../../models/unit";
import {LinkDialogComponent} from "../units-link/dialog/dialog.component";

@Component({
  selector: 'app-units-link',
  templateUrl: './units-link.component.html',
  styleUrls: ['./units-link.component.css']
})
export class UnitsLinkComponent implements OnInit {

  links: Array<UnitToUnit>= [];
  selectedDate: Date | null;
  edited: UnitToUnit = new UnitToUnit();
  statusMessage: string = "";
  isLoaded: boolean = true;

  constructor(
    public unitToUnitService: UnitToUnitService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isLoaded = true;
    this.selectedDate = new Date();
    this.getAll(this.selectedDate)
  }
  getAll(date: Date){
    this.isLoaded = true;
    var dateString = date.toISOString().split("T")[0];
    this.unitToUnitService.getByDate(dateString).subscribe(value => {
      this.links = value
      this.isLoaded = false;
    })
  }

  openDialog(unit: UnitToUnit): void {
    const dialogRef = this.dialog.open(LinkDialogComponent, {
      width: '350px',
      data: unit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.edited = new UnitToUnit();
        this.getAll(this.selectedDate!);
        // this.edited = result;
      }
    });
  }

  delete(unit: UnitToUnit) {
    this.unitToUnitService.deleteById(unit.id).subscribe(data => {
      this.getAll(this.selectedDate!);
    });
  }
}
