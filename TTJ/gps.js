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

module.exports = {
    calculate_distance : function (position1, position2) {

        var format = check_format(position1[0]);
    
        var latitude = set_figure(format);
    
        var longitude = 90000
    
        return ((((convert_to_degree(position1[0]) - convert_to_degree(position2[0])) * latitude) ** 2)
            + (((convert_to_degree(position1[1]) - convert_to_degree(position2[1])) * longitude) ** 2)) ** 0.5;
    
    },
    calculate_speed : function (position1, position2, milisecond = 1000) {
    
        return (calculate_distance(position1, position2) * 3600 / (milisecond / 1000)) / 1000;
    },
    calculate_vector : function (position1, position2, format = 'degree') {    

        var format = check_format(position1[0]);
    
        var latitude = set_figure(format);
    
        var longitude = 90000
    
        return ((convert_to_degree(position1[0]) - convert_to_degree(position2[0])) * latitude) / ((convert_to_degree(position1[1]) - convert_to_degree(position2[1])) * longitude)
    
    }
};