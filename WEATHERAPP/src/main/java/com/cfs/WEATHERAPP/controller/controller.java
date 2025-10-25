package com.cfs.WEATHERAPP.controller;


import com.cfs.WEATHERAPP.dto.WeatherForeCast;
import com.cfs.WEATHERAPP.dto.WeatherResponse;
import com.cfs.WEATHERAPP.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weather")
@CrossOrigin
public class controller {
    @Autowired
    private WeatherService service;

    @GetMapping("/{city}")
    public String getWeatherData(@PathVariable String city)
    {
        return service.test();
    }

    @GetMapping("/my/{city}")
    public WeatherResponse getWeather(@PathVariable String city)
    {
        return service.getData(city);
    }

    @GetMapping("/forecast")
    public WeatherForeCast getForecast(@RequestParam String city, @RequestParam int days)
    {
        return service.getForeCast(city,days);
    }
}