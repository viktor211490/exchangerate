package com.example.exchangerate.controllers;

import com.example.exchangerate.models.ExchangeUnit;
import com.example.exchangerate.models.UnitToUnit;
import com.example.exchangerate.models.UnitToUnitId;
import com.example.exchangerate.repositories.UnitToUnitRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
public class UnitToUnitController {
    private final UnitToUnitRepository unitToUnitRepository;

    public UnitToUnitController(UnitToUnitRepository unitToUnitRepository) {
        this.unitToUnitRepository = unitToUnitRepository;
    }

    @GetMapping(value = "/get")
    public ResponseEntity<Iterable<UnitToUnit>> get() {

        var result = unitToUnitRepository.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @GetMapping(value = "/getById")
    public ResponseEntity<Optional<UnitToUnit>> get(@RequestBody UnitToUnitId id) {

        var result = unitToUnitRepository.findById(id);
        return result.isEmpty() ? new ResponseEntity<>(result, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping(value = "/create")
    public ResponseEntity<UnitToUnit> create(@RequestBody UnitToUnit unitToUnit) {
        try {
            var id = unitToUnit.getId();
            id.setDate(LocalDate.now());
            unitToUnit.setId(id);
            var result = unitToUnitRepository.save(unitToUnit);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody UnitToUnit unit) {
        try {
            unitToUnitRepository.save(unit);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") String id) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-d");
            LocalDate localDate = LocalDate.parse(id, formatter);
            var res = unitToUnitRepository.findAllById_Date(localDate);
            unitToUnitRepository.deleteAll(res);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }
}
