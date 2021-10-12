package com.example.exchangerate.controllers;

import com.example.exchangerate.models.ExchangeUnit;
import com.example.exchangerate.repositories.ExchangeUnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping(value = "/api")
public class ExchangeNameController {
    private final ExchangeUnitRepository exchangeUnitRepository;

    @Autowired
    public ExchangeNameController(ExchangeUnitRepository exchangeUnitRepository) {
        this.exchangeUnitRepository = exchangeUnitRepository;
    }

    @PostMapping(value = "/exchangeName")
    public ResponseEntity<?> create(@RequestBody ExchangeUnit exchangeUnit) {
        try {
            var result = exchangeUnitRepository.save(exchangeUnit);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @GetMapping(value = "/exchangeNames")
    public ResponseEntity<Iterable<ExchangeUnit>> read() {
        final Iterable<ExchangeUnit> names = exchangeUnitRepository.findAll();
        return names.iterator().hasNext() ? new ResponseEntity<>(names, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/exchangeNames/{id}")
    public ResponseEntity<Optional<ExchangeUnit>> readById(@PathVariable(name = "id") Long id) {
        final Optional<ExchangeUnit> unit = exchangeUnitRepository.findById(id);
        return unit.isPresent() ? new ResponseEntity<>(unit, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/exchangeNames")
    public ResponseEntity<?> update(@RequestBody ExchangeUnit exchangeUnit) {
        final ExchangeUnit exchangeName1 = exchangeUnitRepository.save(exchangeUnit);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/exchangeNames/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") Long id) {
        try {
            exchangeUnitRepository.deleteById(id);
            return new ResponseEntity<>("Удалено",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }
}
