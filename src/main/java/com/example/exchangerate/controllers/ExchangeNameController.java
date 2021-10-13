package com.example.exchangerate.controllers;

import com.example.exchangerate.models.ExchangeUnit;
import com.example.exchangerate.repositories.ExchangeUnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping(value = "/api/unit")
public class ExchangeNameController {
    private final ExchangeUnitRepository exchangeUnitRepository;

    @Autowired
    public ExchangeNameController(ExchangeUnitRepository exchangeUnitRepository) {
        this.exchangeUnitRepository = exchangeUnitRepository;
    }

    @CrossOrigin
    @PostMapping(value = "/create")
    public ResponseEntity<?> create(@RequestBody ExchangeUnit exchangeUnit) {
        try {
            var result = exchangeUnitRepository.save(exchangeUnit);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @CrossOrigin
    @GetMapping(value = "/getList")
    public ResponseEntity<Iterable<ExchangeUnit>> read() {
        final Iterable<ExchangeUnit> names = exchangeUnitRepository.findAll();
        return names.iterator().hasNext() ? new ResponseEntity<>(names, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin
    @GetMapping(value = "/getOne/{id}")
    public ResponseEntity<Optional<ExchangeUnit>> readById(@PathVariable(name = "id") Long id) {
        final Optional<ExchangeUnit> unit = exchangeUnitRepository.findById(id);
        return unit.isPresent() ? new ResponseEntity<>(unit, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @CrossOrigin
    @PutMapping(value = "/update")
    public ResponseEntity<?> update(@RequestBody ExchangeUnit exchangeUnit) {
        final ExchangeUnit exchangeName1 = exchangeUnitRepository.save(exchangeUnit);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        try {
            exchangeUnitRepository.deleteById(id);
            return new ResponseEntity<>("Удалено",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }
}
