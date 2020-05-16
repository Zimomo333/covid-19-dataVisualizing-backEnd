package com.zimomo.covid19.controller;

import com.zimomo.covid19.entity.comfirmedCase;
import com.zimomo.covid19.service.getDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class covidController {

    @Autowired
    getDataService getDataService;

    @RequestMapping("/")
    public String covidIndex(){
        return "index.html";
    }

    @RequestMapping("/getData")
    @ResponseBody
    public List<comfirmedCase> getData(){
        return getDataService.getComfirmedCaseList().stream().sorted(Comparator.comparing(comfirmedCase::getTotal).reversed()).collect(Collectors.toList());
    }

    @RequestMapping("/search")
    @ResponseBody
    public List<comfirmedCase> search(String country){
        if(country.equals(""))
            return getDataService.getComfirmedCaseList().stream().sorted(Comparator.comparing(comfirmedCase::getTotal).reversed()).collect(Collectors.toList());
        else
            return getDataService.getComfirmedCaseList().stream().filter(s->s.getCountry().equals(country)).collect(Collectors.toList());
    }
}
