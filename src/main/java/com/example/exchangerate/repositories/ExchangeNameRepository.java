package com.example.exchangerate.repositories;

import com.example.exchangerate.models.ExchangeName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeNameRepository extends JpaRepository<ExchangeName, Long> {
}