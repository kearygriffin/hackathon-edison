module.exports = {
     setPin: function(number, dir){
		var self = this
		var mraa = require('mraa')
		self["pin" + number] = new mraa.Gpio(parseInt(number))
		if(dir == "out") self["pin" + number].dir(mraa.DIR_OUT)
		else self["pin" + number].dir(mraa.DIR_IN)
	 },
	 blinker: function(pinNumber,ledState, number, now){
        var self = this
		if(!self["pin"+pinNumber]) self.setPin(pinNumber, "out")
        var blinkTimeout = null;
        self["pin"+pinNumber].write(ledState?1:0)
        ledState = !ledState
        blinkTimeout = setTimeout(function(){
            if(now < number*2) self.blinker(pinNumber, ledState, number, now + 1)
        },1000)
    },
    getIP: function(){
        var os = require('os')
        var ip = ""
        var ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function (ifname) {
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' == iface.family && iface.internal == false && (ifname == 'wlan0' || ifname == 'Wireless Network Connection')) {
                    ip = iface.address
                }
            })
        })
        return ip
    }
}
