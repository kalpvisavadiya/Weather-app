package com.cfs.WEATHERAPP.dto;

public class Root{
    public Location location;

    public Location getLocation() {
        return location;
    }

    public Forecast getForecast() {
        return forecast;
    }

    public void setForecast(Forecast forecast) {
        this.forecast = forecast;
    }

    public Forecast forecast;



    public void setLocation(Location location) {
        this.location = location;
    }

    public Current getCurrent() {
        return current;
    }

    public void setCurrent(Current current) {
        this.current = current;
    }


    public Current current;
}

