package com.zimomo.covid19.entity;

import lombok.Data;

@Data
public class comfirmedCase {

    private String province;
    private String country;
    private double latitude;    //纬度
    private double longitude;   //经度
    private int total;
    private int diffFromPreDay;

}
