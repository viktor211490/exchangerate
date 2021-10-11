package com.example.exchangerate.controllers;

import com.example.exchangerate.models.ExchangeName;
import com.example.exchangerate.repositories.ExchangeNameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ExchangeNameController {
    private final ExchangeNameRepository exchangeNameRepository;

    @Autowired
    public ExchangeNameController(ExchangeNameRepository exchangeNameRepository) {
        this.exchangeNameRepository = exchangeNameRepository;
    }

    @PostMapping(value = "/exchangeName")
    public ResponseEntity<?> create(@RequestBody ExchangeName exchangeName) {
        exchangeNameRepository.save(exchangeName);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/exchangeNames")
    public ResponseEntity<List<ExchangeName>> read() {
        final List<ExchangeName> names = exchangeNameRepository.findAll();
        return names != null && !names.isEmpty() ? new ResponseEntity<>(names, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/exchangeNames/{id}")
    public ResponseEntity<Optional<ExchangeName>> readById(@PathVariable(name = "id") Long id) {
        final Optional<ExchangeName> exchangeName = exchangeNameRepository.findById(id);
        return exchangeName != null ? new ResponseEntity<>(exchangeName, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/exchangeNames/{id}")
    public ResponseEntity<?> update(@RequestBody ExchangeName exchangeName) {
        final ExchangeName exchangeName1 = exchangeNameRepository.save(exchangeName);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/exchangeNames/{id}")
    public ResponseEntity<?> delete(@RequestBody ExchangeName exchangeName) {
        try {
            exchangeNameRepository.delete(exchangeName);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }
}
