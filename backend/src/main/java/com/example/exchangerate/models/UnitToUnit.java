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

    private String description;

    public UnitToUnit() {
    }

    public UnitToUnit(UnitToUnitId id, Double value, String description) {
        this.id = id;
        this.value = value;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}