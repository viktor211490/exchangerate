package com.example.exchangerate.repositories;

import com.example.exchangerate.models.ExchangeUnit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeUnitRepository extends JpaRepository<ExchangeUnit, Long> {
}