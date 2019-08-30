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

function check_format(position){
    if(position.search('"')){
        return 'second';
    }

    else if (position.search(`'`)){
        return 'minuate';
    }

    else{
        return 'degree';
    }
};

function calculate_vector(position1, position2, format = 'degree') { // 기울기 계산
    ```
    calculate vector in which an object has moved

    
    @params

    position 1 : list of Coordinates [latitude, longtitude]

    position 2 : list of Coordinates [latitude, longtitude]

    format : default = degree, Set the data type of position

    

    @return

    return : the vector of distance that the object moved

    ```

    var format = check_format(position1[0]);

    var latitude = set_figure(format);

    var longitude = 90000

    return ((convert_to_degree(position1[0]) - convert_to_degree(position2[0])) * latitude) / ((convert_to_degree(position1[1]) - convert_to_degree(position2[1])) * longitude)

}

module.exports = {
    calculate_distance : function (position1, position2) { // 두 점 사이 거리(m)
        ```
        Calculate distance bewteen two position


        @params

        position1 : list of Coordinates [latitude, longtitude]
        position2 : list of Coordinates [latitude, longtitude]


        @return

        Returns the distance between two points in meters (floats)
        ```

        var format = check_format(position1[0]);
    
        var latitude = set_figure(format);
    
        var longitude = 90000
    
        return ((((convert_to_degree(position1[0]) - convert_to_degree(position2[0])) * latitude) ** 2)
            + (((convert_to_degree(position1[1]) - convert_to_degree(position2[1])) * longitude) ** 2)) ** 0.5;
    
    },
    calculate_speed : function (position1, position2, milisecond = 1000) { // 속도 계산(km/h)
        ```
        Calculate speed when object move from position1 to position2

        @params

        position 1: list of Coordinates [latitude, longtitude]

        position 2: list of Coordinates [latitude, longtitude]

        milisecomd : the time that the object moved from position 1 to position 2 as milisecond


        @return

        return km/h (float)

        ```
    
        return (calculate_distance(position1, position2) * 3600 / (milisecond / 1000)) / 1000;
    }
};