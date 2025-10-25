package com.cfs.WEATHERAPP.dto;

import java.util.List;

public class WeatherForeCast {

    private WeatherResponse weatherResponse;

    public WeatherResponse getWeatherResponse() {
        return weatherResponse;
    }

    public void setWeatherResponse(WeatherResponse weatherResponse) {
        this.weatherResponse = weatherResponse;
    }

    public List<DayTemp> getDayTemp() {
        return dayTemp;
    }

    public void setDayTemp(List<DayTemp> dayTemp) {
        this.dayTemp = dayTemp;
    }

    private List<DayTemp> dayTemp;

}
