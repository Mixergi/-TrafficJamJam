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

module.exports = {
    calculate_distance: C_dist, // 거리
    calculate_speed: CS, // 속도
    calculate_direction: CD  // 방향
};