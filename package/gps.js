function set_figure(format) {

    var latitude = 0;

    if (format == 'degree') {
        latitude = 110000;
    }
    else if (format == 'minuate') {
        latitude = 108000;
    }
    else if (format == 'second') {
        latitude = 126000;
    }

    return latitude;
};

function convert_to_degree(position) {

    var degree = position.search(`°`);

    var minuate = position.search(`'`);

    var second = position.search(`"`);

    if (minuate == -1) {
        return parseFloat(position.slice(0, degree));
    }

    if (second == -1) {
        return parseFloat(position.slice(0, degree)) + parseFloat(position.slice(degree + 1, minuate)) / 60;
    }

    return parseFloat(position.slice(0, degree)) + parseFloat(position.slice(degree + 1, minuate)) / 60 + parseFloat(position.slice(minuate + 1, second)) / 3600;

};

function check_format(position) {
    if (position.search('"')) {
        return 'second';
    }

    else if (position.search(`'`)) {
        return 'minuate';
    }

    else {
        return 'degree';
    }
};

calculate_vector = function (position1, position2, format = 'degree') {

    var format = check_format(position1[0]);

    var latitude = set_figure(format);

    var longitude = 90000

    return ((convert_to_degree(position1[0]) - convert_to_degree(position2[0])) * latitude) / ((convert_to_degree(position1[1]) - convert_to_degree(position2[1])) * longitude)

};

C_dist = function (position1, position2) {
    /**
    Calculate distance bewteen two position


    @params

    position1 : list of Coordinates [latitude, longtitude]
    position2 : list of Coordinates [latitude, longtitude]


    @return

    Returns the distance between two points in meters (floats)
    */

    var format = check_format(position1[0]);

    var latitude = set_figure(format);

    var longitude = 90000

    return ((((convert_to_degree(position1[0]) - convert_to_degree(position2[0])) * latitude) ** 2)
        + (((convert_to_degree(position1[1]) - convert_to_degree(position2[1])) * longitude) ** 2)) ** 0.5;

};

CS = function (position1, position2, milisecond = 1000) {
    /** 
    Calculate speed when object move from position1 to position2

    @params

    position 1: list of Coordinates [latitude, longtitude]

    position 2: list of Coordinates [latitude, longtitude]

    milisecomd : the time that the object moved from position 1 to position 2 as milisecond


    @return

    return km/h (float)

    */

    return (C_dist(position1, position2) * 3600 / (milisecond / 1000)) / 1000;
};

CD = function (position1, position2) {

    var vector = calculate_vector(position1, position2);

    position1_longitude = convert_to_degree(position1[1]);

    position2_longitude = convert_to_degree(position2[1]);

    if (position1_longitude < position2_longitude) {
        if (vector > 3.8) {
            return 1;
        }

        else if (vector > 0.4) {
            return 2;
        }

        else if (vector > -0.4) {
            return 3;
        }

        else if (vector > -3.8) {
            return 4;
        }

        else {
            return 5;
        }
    }

    else if (position1_longitude > position2_longitude) {
        if (vector > 3.8) {
            return 5;
        }

        else if (vector > 0.4) {
            return 6;
        }

        else if (vector > -0.4) {
            return 7;
        }

        else if (vector > -3.8) {
            return 8;
        }

        else {
            return 1;
        }
    }

    else {

        var position1_latitude = convert_to_degree(position1[0]);

        var position2_latitude = convert_to_degree(position2[0]);

        if (position1_latitude < position2_latitude){
            return 1;
        }

        else if (position1_latitude > position2_latitude){
            return 5;
        }

        else {
            return 0;
        }
    }
};

function mlat(m){
    return parseInt(m / 0.9) * 0.00001;
}
function mlon(m){
    return parseInt(m / 1.1) * 0.00001;
}

function clc_coor(p1, p2, operator='+'){
    if(typeof p1 === "string"){
        var P1 = parseFloat(p1.substring(0, p1.length-1))
        var P2 = parseFloat(p2.substring(0, p2.length-1))
    } else {
        var P1 = p1;
        var P2 = p2;
    }
    
    var sum = 0;
    if(operator == '+') sum = P1 + P2;
    else if(operator == '-') sum = P1 - P2;
    else{
        console.log('error');
        return 100;
    }
    return sum;
}

STL = function(direction, lat, lon, now_lat, now_lon){
    var x = [], y = [];
    switch(direction){
        case 1:
            x = [clc_coor(now_lon, lon/4, '-'), clc_coor(now_lon, lon/4, '+')]; // 위도의 극값
            y = [now_lat, clc_coor(now_lat, lat, '+')]; // 경도의 극값
            break;
        case 2:
            x = [now_lon, clc_coor(now_lon, lon/2, '+')];
            y = [now_lat, clc_coor(now_lat, lat/2, '+')];
            break;
        case 3:
            x = [now_lon, clc_coor(now_lon, lon, '+')];
            y = [clc_coor(now_lat, lat/4, '-'), clc_coor(now_lat, lat/4, '+')]; 
            break;
        case 4:
            x = [now_lon, clc_coor(now_lon, lon/2, '+')];
            y = [clc_coor(now_lat, lat/2, '-'), now_lat];
            break;
        case 5:
            x = [clc_coor(now_lon, lon/4, '-'), clc_coor(now_lon, lon/4, '+')];
            y = [clc_coor(now_lay, lat, '-'), now_lat];
            break;
        case 6:
            x = [clc_coor(now_lon, lon/2, '-'), now_lon];
            y = [clc_coor(now_lat, lat/2, '-'), now_lat];
            break;
        case 7:
            x = [clc_coor(now_lon, lon, '-'), now_lon];
            y = [clc_coor(now_lat, lat/4, '-'), clc_coor(now_lat, lat/4, '+')]; 
            break;
        case 8:
            x = [clc_coor(now_lon, lon/2, '-'), now_lon];
            y = [now_lat, clc_coor(now_lat, lat/2, '+')];
            break;
    }

    return [x, y];
}
GR = function(location){
    var coordinates = [convert_to_degree(location[0])+0.00011, convert_to_degree(location[1])+0.0001];
    return coordinates;
}

module.exports = {
    calculate_distance: C_dist, // 거리
    calculate_speed: CS, // 속도
    calculate_direction: CD,  // 방향
    m_to_lat: mlat,
    m_to_lon: mlon,
    calculate_coordinate: clc_coor,
    search: STL,
    get_Radius: GR
};