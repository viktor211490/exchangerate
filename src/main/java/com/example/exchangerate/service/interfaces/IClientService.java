package com.example.exchangerate.service.interfaces;

import com.example.exchangerate.models.ExchangeName;

import java.util.List;

public interface IClientService {

    //    create
    void create(ExchangeName exchangeName);

    //    read
    List<ExchangeName> readAll();

    ExchangeName read(int id);

    //    update
    boolean update(ExchangeName exchangeName, int id);

    //    delete
    boolean delete(int id);
}

