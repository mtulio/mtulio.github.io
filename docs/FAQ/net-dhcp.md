# DHCP

Define the various protocol states of DHCP
DHCPDISCOVER client->server : broadcast to locate server
DHCPOFFER server->client : offer to client with offer of configuration parameters
DHCPREQUEST client->server : requesting a dhcp config from server
DHCPACK server->client : actual configuration paramters
DHCPNAK server->client : indicating client’s notion of network address is incorrect
DHCPDECLINE client->server : address is already in use
DHCPRELEASE client->server : giving up of ip address
DHCPINFORM client->server : asking for local config parameters
Reference: https://www.ietf.org/rfc/rfc2131.txt