package com.example.exchangerate.repositories;

import com.example.exchangerate.models.UnitToUnit;
import com.example.exchangerate.models.UnitToUnitId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface UnitToUnitRepository extends CrudRepository<UnitToUnit, UnitToUnitId> {
    void deleteById_Date(LocalDate date);
    List<UnitToUnit> findAllById_Date(LocalDate date);

    List<UnitToUnit> findById_DateOrderById(LocalDate date);



    List<UnitToUnit> findById_DateBetween(LocalDate dateStart, LocalDate dateEnd);

    List<UnitToUnit> findById_SecondUnitId_CodeAndId_Date(String code, LocalDate date);


}