package com.example.exchangerate.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

@Table(name = "unit_to_unit")
@Entity
public class UnitToUnit {
    @EmbeddedId
    private UnitToUnitId id;

    private Double value;


    public UnitToUnit() {
    }

    public UnitToUnit(UnitToUnitId id, Double value) {
        this.id = id;
        this.value = value;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public UnitToUnitId getId() {
        return id;
    }

    public void setId(UnitToUnitId id) {
        this.id = id;
    }

}