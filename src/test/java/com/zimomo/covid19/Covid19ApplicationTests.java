package com.zimomo.covid19;

import com.zimomo.covid19.controller.covidController;
import com.zimomo.covid19.service.getDataService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class Covid19ApplicationTests {

    @Autowired
    getDataService getDataService;

    @Autowired
    covidController covidController;

    @Test
    void contextLoads() throws IOException {
        System.out.println(getDataService.getComfirmedCaseList());
        System.out.println(covidController.getData());
        System.out.println(covidController.search("China"));
    }

}
