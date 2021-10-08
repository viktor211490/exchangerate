package com.example.exchangerate.controllers;

import com.example.exchangerate.models.ExchangeName;
import com.example.exchangerate.service.interfaces.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExchangeNameController {
    private final IClientService _clientService;

    @Autowired
    public ExchangeNameController(IClientService clientService) {
        _clientService = clientService;
    }

    @PostMapping(value = "/exchangeName")
    public ResponseEntity<?> create(@RequestBody ExchangeName exchangeName) {
        _clientService.create(exchangeName);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/exchangeNames")
    public ResponseEntity<List<ExchangeName>> read() {
            final List<ExchangeName> names = _clientService.readAll();
        return names != null && !names.isEmpty() ? new ResponseEntity<>(names, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/exchangeNames/{id}")
    public ResponseEntity<ExchangeName> readById(@PathVariable(name = "id") int id) {
        final ExchangeName exchangeName = _clientService.read(id);
        return exchangeName != null ? new ResponseEntity<>(exchangeName, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/exchangeNames/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") int id, @RequestBody ExchangeName name) {
        final boolean updated = _clientService.update(name, id);

        return updated ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(value = "/exchangeNames/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") int id) {
        final boolean deleted = _clientService.delete(id);

        return deleted ? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
}
