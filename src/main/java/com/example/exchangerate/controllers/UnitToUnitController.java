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

    @CrossOrigin
    @GetMapping(value = "/get")
    public ResponseEntity<Iterable<UnitToUnit>> get() {

        var result = unitToUnitRepository.findAll();
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @CrossOrigin
    @GetMapping(value = "/getByDate/{date}")
    public ResponseEntity<List<UnitToUnit>> get(@PathVariable(name = "date") String data) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-d");
        LocalDate localDate = LocalDate.parse(data, formatter);
        var result = unitToUnitRepository.findById_DateOrderById(localDate);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @CrossOrigin
    @GetMapping(value = "/getByDateCode")
    public ResponseEntity<List<UnitToUnit>> getByDateCode(@RequestBody String code, String date) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-d");
        LocalDate localDate = LocalDate.parse(date, formatter);
        var result = unitToUnitRepository.findById_FirstUnitId_CodeAndId_Date(code,localDate);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @CrossOrigin
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

    @CrossOrigin
    @PostMapping(value = "/createList")
    public ResponseEntity<Iterable<UnitToUnit>> createList(@RequestBody List<UnitToUnit> unitToUnit) {
        try {

            var result = unitToUnitRepository.saveAll(unitToUnit);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @CrossOrigin
    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody UnitToUnit unit) {
        try {
            unitToUnitRepository.save(unit);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @CrossOrigin
    @DeleteMapping(value = "/delete/{data}")
    public ResponseEntity<?> delete(@PathVariable(name = "data") String data) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-d");
            LocalDate localDate = LocalDate.parse(data, formatter);
            var res = unitToUnitRepository.findAllById_Date(localDate);
            unitToUnitRepository.deleteAll(res);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @CrossOrigin
    @DeleteMapping(value = "/delete")
    public ResponseEntity<?> deleteBuId(@RequestBody UnitToUnitId id) {
        try {
            unitToUnitRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }
}
