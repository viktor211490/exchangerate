package com.example.exchangerate.service.implementation;

import com.example.exchangerate.models.ExchangeName;
import com.example.exchangerate.service.interfaces.IClientService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ClientService implements IClientService {

    private static final Map<Integer, ExchangeName> CLIENT_REPOSITORY_MAP = new HashMap<>();

    private static final AtomicInteger CLIENT_ID_HOLDER = new AtomicInteger();


    @Override
    public void create(ExchangeName exchangeName) {
        final int exchangeNameId = CLIENT_ID_HOLDER.incrementAndGet();
        exchangeName.setId(exchangeNameId);
        CLIENT_REPOSITORY_MAP.put(exchangeNameId, exchangeName);
    }

    @Override
    public List<ExchangeName> readAll() {
        return new ArrayList<>(CLIENT_REPOSITORY_MAP.values());
    }

    @Override
    public ExchangeName read(int id) {
        return CLIENT_REPOSITORY_MAP.get(id);
    }

    @Override
    public boolean update(ExchangeName exchangeName, int id) {
        if (CLIENT_REPOSITORY_MAP.containsKey(id)) {
            exchangeName.setId(id);
            CLIENT_REPOSITORY_MAP.put(id, exchangeName);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        return CLIENT_REPOSITORY_MAP.remove(id) !=null;
    }
}
