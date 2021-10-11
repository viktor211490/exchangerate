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
    @Column(name = "name_eng")
    private String nameEng;
    private String code;
    private String image;

//    @OneToMany
//    private List<UnitToUnit> unitToUnits;


    public ExchangeUnit() {
    }

    public ExchangeUnit(String nameRu, String nameEng, String code, String image) {
        this.nameRu = nameRu;
        this.nameEng = nameEng;
        this.code = code;
        this.image = image;
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

    public String getNameEng() {
        return nameEng;
    }

    public void setNameEng(String nameEng) {
        this.nameEng = nameEng;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}