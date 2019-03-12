Miscellaneous
How does Apache worker.c compare to prefork?
Worker.c uses threads. Prefork uses forks. Prefork is by default in Apache. Worker.c uses less resources, but is more complex.

How do you update packages on Fedora/Ubuntu?
1
2
3
4
5
#Ubuntu
sudo apt-get update -y
 
#Fedora
sudo yum update -y
How do you upgrade to a new release on Fedora/Ubuntu?
1
2
3
4
5
#Ubuntu
sudo apt-get upgrade -y
 
#Fedora
Use FedUP https://fedoraproject.org/wiki/FedUp
How do you use SSH proxy to connect to a remote host?
In your $HOME/.ssh/config use:

1
2
3
4
5
TCPKeepAlive=yes
ServerAliveInterval=15
 
Host finaldestinationhost
   ProxyCommand ssh user@jumphost nc finaldestinationhost %p
To ssh use ssh user@finaldestinationhost.

How do you use SSH to create a dynamic tunnel?
Let’s say there are 3 hosts, one is source, the other is destination and you cannot get to the destination from the source.
In the middle is a gateway that can reach both the source and the destination.
One possible solution to get from source to destination using SSH dynamic tunnel, is to create a dynamic tunnel.
The way it would work is

How do you use change MySQL root password?
1
2
3
4
$mysql -u root -p
&gt;use mysql;
&gt;update user set password=PASSWORD(&quot;NEWPASSWORD&quot;) where User='root';
&gt;flush privileges;
How do you redirect console of a Linux host to serial interface?
Make sure in BIOS serial console port redirection is set.
Secondly in the Grub menu, append the following to the boot line ‘console=tty0 console=ttyS1,57600n8’.

How do you VNC server without any authentication?
Xvnc :2 -nevershared -depth 16 -br IdleTimeout=0 -auth /dev/null -once DisconnectClients=false desktop=”MyDesktop” SecurityTypes=None rfbauth=0

How do you install CentOS via HTTP if not using Kickstart?
One option is to boot from the network using PXE or using a USB drive which has Unetbootin installed.
Once you start installation, go to the main menu, select the ‘Start Installation’ option, choose ‘Network’ as the source, choose ‘HTTP’ as the protocol, enter ‘mirrors.kernel.org’ when prompted for a server, and enter ‘/centos/6/os/x86_64’ when asked for the folder.