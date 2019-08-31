module.exports = {
    User : function (room_num) {

        this.room_num = room_num;
      
        this.coordinate = [['0.00000°', '0.00000°'], ['0.00000°', '0.00000°']];
      
        this.last_update = Date.now();
        this.before_update = Date.now();
      
        this.update_position = function (position) {
          this.coordinate[0] = this.coordinate[1];
      
          this.coordinate[1] = position;
      
          this.before_update = this.last_update;
      
          this.last_update = Date.now();
        };
      
        this.get_renewal_time = function() {
          return last_update - before_update;
        };
      }
}