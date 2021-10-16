package com.example.exchangerate.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "exchange_unit")
public class ExchangeUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name_ru")
    private String nameRu;
    private String code;


    public ExchangeUnit() {
    }

    public ExchangeUnit(String nameRu, String nameEng, String code, String image) {
        this.nameRu = nameRu;
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public String getNameRu() {
        return nameRu;
    }

    public void setNameRu(String nameRu) {
        this.nameRu = nameRu;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}