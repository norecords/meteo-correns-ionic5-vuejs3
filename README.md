# MÉTÉO CORRENS - Ionic 5, VueJs 3, RxJS, ngx-mqtt, Highstock, font Awesome
Météo Correns is an app made with Ionic VueJs Framework 5.4.0, datas are provided by json files and mqtt messages. These json files and messages are generated by Weewx wich grab sensors values on my homemade weather station.

### Installation:
Make sure you've installed the latest version of the Ionic CLI:
```bash
$ sudo npm install -g ionic
```
Clone or download and access this repo:
```bash
$ git clone https://github.com/norecords/meteo-correns-ionic5-vuejs3/
$ cd meteo-correns
```
Install node modules:
```bash
$ npm install
```
Test the App in your Browser
```bash
$ ionic serve
```

### Third party
This project use:
- DIY weather station BYOWS -> https://projects.raspberrypi.org/en/projects/build-your-own-weather-station/
- Weewx as backend for the weather station -> http://www.weewx.com/
- Mosquitto as mqtt broker -> https://mosquitto.org/
- HighStock by HighCharts -> https://www.highcharts.com/products/highstock/
- Weather Icons -> https://erikflowers.github.io/weather-icons/
- Forecast Weather Symbol by [yr.no](https://www.yr.no/) -> https://github.com/YR/weather-symbols
- Weather forecast from Yr, delivered by the Norwegian Meteorological Institute and NRK -> [Forecast Page](http://www.yr.no/place/France/Provence-Alpes-Côte_d’Azur/Correns)

and many other things..


### License
GNU GPLv3 - Copyright 2021 meteo.correns.org