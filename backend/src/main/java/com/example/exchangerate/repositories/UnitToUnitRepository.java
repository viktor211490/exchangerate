package com.example.exchangerate.repositories;

import com.example.exchangerate.models.UnitToUnit;
import com.example.exchangerate.models.UnitToUnitId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface UnitToUnitRepository extends JpaRepository<UnitToUnit, UnitToUnitId> {
    void deleteAllByIdContains(LocalDate date);
}