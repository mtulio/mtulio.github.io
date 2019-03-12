# DNS

Explain the SOA record in DNS

## SOA

SOA stands for Start of Authority and it contains the following entries:

@ IN SOA nameserver.mycomaind.com. postmaster.mydomain.com. (
1 ; serial number
3600 ; refresh [1h]
600 ; retry [10m]
86400 ; expire [1d]
3600 ) ; min TTL [1h]fire

Serial number should be refreshed each time a change is made to the zone file. This is how slave DNS servers know to pull a change from the master.
Refresh is the amount of time a slave DNS server should wait before pulling from the master.
Retry is how long a slave should wait before retrying to get a zone file if the initial retry fails.
Expire is how long a secondary server will keep trying to get a zone from the master. If this time expires before a successful zone transfer, the secondary will stop answering queries.
TTL is how long to keep the data in a zone file.