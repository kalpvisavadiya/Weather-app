package com.cfs.WEATHERAPP.dto;

import java.util.ArrayList;

public class Forecast{
    public ArrayList<Forecastday> getForecastday() {
        return forecastday;
    }

    public void setForecastday(ArrayList<Forecastday> forecastday) {
        this.forecastday = forecastday;
    }

    public ArrayList<Forecastday> forecastday;
}
