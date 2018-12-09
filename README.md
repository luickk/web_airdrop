# Web Airdrop

An extension for ros_airdrop that uses roslibjs for managing settings & missions.

### Installation

   > requires [ros_airdrop](https://github.com/mrGrimod/ros_airdrop) roscore running

1. `cd /var/www/html` <br>

2. `git clone https://github.com/MrGrimod/web_airdrop.git` <br>

3. Go to http://address/web_airdrop/gps.html


### Channels.html:

Managing single channels of the DJI-Naza manually

### Config.php:

Managing the config file (/etc/naza/pwm_config.txt) of [dji_naza_interface_c-](https://github.com/MrGrimod/dji_naza_interface_c-) library.

### GPS.html:

Subscribes to gps_node which publishes GPS data to display the data show the distance from the start-up position or set the start-up location.

### Tools.html:

Provides tools such as recalibrating the DJI-naza through the [dji_naza_interface_c-](https://github.com/MrGrimod/dji_naza_interface_c-) library.

### Console.html:

Subscribes to rosout and rosout_agg and displays it in a console window.
