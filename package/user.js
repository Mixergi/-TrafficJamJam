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
        if(this.near_traffic_light == null) {
            NTL['location'] = [String(NTL.location.latitude)+'°', String(NTL.location.longitude)+'°'];
            this.near_traffic_light = NTL;
            console.log('마킹 설정');
            console.log(this.near_traffic_light);
        } else {
            NTL['location'] = [String(NTL.location.latitude)+'°', String(NTL.location.longitude)+'°'];
            if(NTL == this.near_traffic_light) return;
            if(NTL.direction != this.near_traffic_light.direction) {
                this.near_traffic_light = NTL;
                console.log('마킹 재설정');
                return;
            }
            if(this.remove_mark()){
                this.near_traffic_light = null;
                console.log('마킹 제거');
            }
            var now_coordinate = this.near_traffic_light.location,
                new_coordinate = NTL.location,
                get_dis = require('./gps').calculate_distance,
                now_distance = get_dis(this.coordinate[1], now_coordinate),
                new_distance = get_dis(this.coordinate[1], new_coordinate);
            if(now_distance > new_distance){
                this.near_traffic_light = NTL;
                console.log('마킹 재설정');
            }
        }
        console.log(this.near_traffic_light);
    };

    this.remove_mark = function (){
        switch(this.near_traffic_light.direction){
            case 1:
            case 2: // 위도 +
                if(this.coordinate[1][1].localeCompare(this.near_traffic_light.location[1]) == 1) 
                return true;
            case 3:
            case 4:
                if(this.coordinate[1][0].localeCompare(this.near_traffic_light.location[0]) == 1)
                return true;
            case 5:
            case 6:
                if(this.coordinate[1][1].localeCompare(this.near_traffic_light.location[1]) == -1)
                return true;
            case 7:
            case 8:
                if(this.coordinate[1][0].localeCompare(this.near_traffic_light.location[0]) == -1)
                return true;
        }
    }
};