module.exports = function (room_num) {

    this.room_num = room_num;
    this.near_traffic_light = null;
    /* near_traffic_light 양식
    {
        direction: 1~8,
        location: [X.XXXXXX, X.XXXXXX],
        timeInfo: X
    }
    */

    this.coordinate = [['0.00000°', '0.00000°'], ['0.00000°', '0.00000°']];

    this.last_update = Date.now();
    this.before_update = Date.now();

    this.update_position = function (position) {
        this.coordinate[0] = this.coordinate[1];

        this.coordinate[1] = position;

        this.before_update = this.last_update;

        this.last_update = Date.now();
    };

    this.get_renewal_time = function () {
        return last_update - before_update;
    };

    this.set_traffic_light = function (NTL){
        if(NTL == null) {
            this.near_traffic_light = null;
        } else if(this.near_traffic_light == null) {
            NTL['location'] = [String(NTL.location.latitude)+'°', String(NTL.location.longitude)+'°'];
            this.near_traffic_light = NTL;
        } else {
            NTL['location'] = [String(NTL.location.latitude)+'°', String(NTL.location.longitude)+'°'];
            var now_coordinate = this.near_traffic_light.location,
                new_coordinate = NTL.location,
                get_dis = require('./gps').calculate_distance,
                now_distance = get_dis(this.coordinate[1], now_coordinate),
                new_distance = get_dis(this.coordinate[1], new_coordinate);
            if(now_distance < new_distance){
                this.near_traffic_light = NTL;
            }
        }
        console.log(this.near_traffic_light);
    };
};