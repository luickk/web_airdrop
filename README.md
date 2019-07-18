# Web Airdrop

An extension for [ros_airdrop](https://github.com/MrGrimod/ros_airdrop) that uses [roslibjs](http://wiki.ros.org/roslibjs), to communicate with the RosCore running on the drone. Via the Web Interface you can manage or monitor settings, flight states and start missions.

### Installation

1. `cd /var/www/html` <br>

2. `git clone https://github.com/MrGrimod/web_airdrop.git` <br>

3. Go to http://address/web_airdrop/

   > requires [ros_airdrop](https://github.com/mrGrimod/ros_airdrop) roscore running

4. Add www-data mission to /etc missions folder: <br>
  `sudo chown -R www-data /etc/airdrop/missions/`


### Video

https://www.youtube.com/watch?v=QzOBck26Hko

### index.html:

Serves as dashboard to monitor all important flight states/variables and to start/monitor ongoing missions.


### Channels.html:

Managing single channels of the DJI-Naza manually, but also offers the possibility to manipulate flight states from the CC Node.

### Missions.html:

Displaying all available missions, as well as there progress/states.
Also offers the option to start/abort missions.

### States.html:

Displaying all core states managed by the CC Node.

### Config.php:

Managing the config file (/etc/naza/pwm_config.txt) of [dji_naza_interface_c-](https://github.com/MrGrimod/dji_naza_interface_c-) library.

### GPS.html:

Subscribes to gps_node which publishes GPS data, to display the data or set the start-up location manually.

### Tools.html:

Provides tools such as recalibrating the DJI-naza through the [dji_naza_interface_c-](https://github.com/MrGrimod/dji_naza_interface_c-) library.

### Console.html:

Subscribes to rosout and rosout_agg and displays it in a console window.
