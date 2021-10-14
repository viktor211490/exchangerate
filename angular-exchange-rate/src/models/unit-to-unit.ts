import {Unit} from "./unit";

export class UnitToUnit {
  id: UnitToUnitId
  value: number
}

class UnitToUnitId {
  firstUnitId: Unit
  secondUnitId: Unit
  date: string
}
