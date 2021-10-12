package com.example.exchangerate.models;

import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Embeddable
public class UnitToUnitId implements Serializable {
    private static final long serialVersionUID = 2213556045138642486L;
    @ManyToOne
    @JoinColumn(name = "first_unit_id", nullable = false)
    private ExchangeUnit firstUnitId;
    @ManyToOne
    @JoinColumn(name = "second_unit_id", nullable = false)
    private ExchangeUnit secondUnitId;
    @Column(name = "date", nullable = false)
    private LocalDate date;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public ExchangeUnit getFirstUnitId() {
        return firstUnitId;
    }

    public void setFirstUnitId(ExchangeUnit firstUnitId) {
        this.firstUnitId = firstUnitId;
    }

    public ExchangeUnit getSecondUnitId() {
        return secondUnitId;
    }

    public void setSecondUnitId(ExchangeUnit secondUnitId) {
        this.secondUnitId = secondUnitId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, firstUnitId, secondUnitId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UnitToUnitId entity = (UnitToUnitId) o;
        return Objects.equals(this.date, entity.date) &&
                Objects.equals(this.firstUnitId, entity.firstUnitId) &&
                Objects.equals(this.secondUnitId, entity.secondUnitId);
    }
}