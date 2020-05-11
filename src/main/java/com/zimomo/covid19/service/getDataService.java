package com.zimomo.covid19.service;

import com.zimomo.covid19.entity.comfirmedCase;
import org.apache.commons.csv.*;
import org.springframework.core.io.Resource;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
public class getDataService {

    private List<comfirmedCase> comfirmedCaseList= new ArrayList<comfirmedCase>();

    String COVID_DATA_URL = "https://gitee.com/dgut-sai/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

    RequestEntity<Void> requestEntity = RequestEntity
            .get(URI.create(COVID_DATA_URL))
            .headers(httpHeaders -> httpHeaders.add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"))
            .build();

    @PostConstruct      //spring容器初始化时自动执行一次该方法
    @Scheduled(cron = "0 0 0 * * *")        //计划任务，定期执行方法更新数据
    public void initData() throws IOException {

        ResponseEntity<Resource> exchange = new RestTemplate().exchange(requestEntity, Resource.class);
        Resource body = exchange.getBody();

        comfirmedCaseList.clear();  //清空数组
        Reader reader = new InputStreamReader(body.getInputStream());
        Iterable<CSVRecord> records = CSVFormat.RFC4180.withFirstRecordAsHeader().parse(reader);
        for (CSVRecord record : records) {
            comfirmedCase comfirmedCase = new comfirmedCase();
            comfirmedCase.setProvince(record.get("Province/State"));
            comfirmedCase.setCountry(record.get("Country/Region"));
            comfirmedCase.setLatitude(Double.parseDouble(record.get("Lat")));
            comfirmedCase.setLongitude(Double.parseDouble(record.get("Long")));
            comfirmedCase.setTotal(Integer.parseInt(record.get(record.size()-1)));
            comfirmedCase.setDiffFromPreDay(comfirmedCase.getTotal()-Integer.parseInt(record.get(record.size()-2)));
            comfirmedCaseList.add(comfirmedCase);
        }

    }

    public List<comfirmedCase> getComfirmedCaseList() {
        return comfirmedCaseList;
    }
}
