import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {forkJoin} from 'rxjs';
import {Unit} from 'src/models/unit';
import {UnitService} from 'src/services/unit.service';
import {DialogComponent} from "./dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  edited: Unit = new Unit();
  units: Array<Unit> = [];
  statusMessage: string = "";
  isLoaded: boolean = true;


  constructor(
    private unitService: UnitService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.isLoaded = true;
    forkJoin({
      units: this.unitService.getAll(),
    }).subscribe(value => {
      this.units = value.units;
      this.isLoaded = false;
    })
  }

  openDialog(unit: Unit): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: unit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.edited = new Unit();
        this.getAll();
        // this.edited = result;
      }
    });
  }

  delete(unit: Unit) {
    this.unitService.delete(unit.id).subscribe(data => {
      this.getAll();
    });
  }

}
