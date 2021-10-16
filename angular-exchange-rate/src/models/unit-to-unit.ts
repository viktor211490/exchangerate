import {Unit} from "./unit";

export class UnitToUnit {
  id: UnitToUnitId
  value: number
}

export class UnitToUnitId {
  firstUnitId: Unit
  secondUnitId: Unit
  date: string
}
