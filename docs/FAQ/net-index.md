# Networking

Define TCP slow start
Tcp slow start is a congestion control algorithm that starts by increasing the TCP congestion window each time an ACK is received, until an ACK is not received.

Reference:http://en.wikipedia.org/wiki/Slow-start

Name a few TCP connections states
1) LISTEN – Server is listening on a port, such as HTTP
2) SYNC-SENT – Sent a SYN request, waiting for a response
3) SYN-RECEIVED – (Server) Waiting for an ACK, occurs after sending an ACK from the server
4) ESTABLISHED – 3 way TCP handshake has completed


How do you figure out the network and broadcast address of a network given a netmask?
Describe a TCP packet fields
Difference between TCP/UDP
Reliable/Unreliable
Ordered/Unordered
Heavyweight/Lightweight
Streaming
Header size
Examples:
What are the different kind of NAT available?
There is SNAT and DNAT. SNAT stands for source network address translation. DNAT stands for destination network address translation. SNAT occurs when the source IP address if RFC 1918 and is changed to be non-RFC 1918. For instance if you are at home using your cable model and want to connect to and external site such as http://www.cnn.com, then your router will change the source address of the TCP packet to be it’s external public IP. This is called SNAT. DNAT is when the destination IP address is changed. For instance when your packet reaches the http://www.cnn.com router, and the web server behind the router is using RFC 1918 space, then the router might change the destination to be the RFC 1918 IP address of the web server. This is called DNAT.