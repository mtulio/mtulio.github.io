Databases
What is the difference between MyISAM and InnoDB?
MyISAM:
1. Supports table level locking
2. Is Faster than InnoDB
3. Does not support foreign keys
4. Stores table, data and index in different files
5. Does not support transactions (no commit with rollback)
6. Useful for more selects with fewer updates
InnoDB:
1. Support row level locking
2. Is slower than MyISAM
3. Supports foreign keys
4. Stores table and index in table space
5. Supports transactions

What are some things to check on a slow database?
MySQL is fairly popular, so let’s look at some basic MySQL debugging. First off, check the OS to make sure the system is running fine, specially check CPU, memory, SWAP space and disk I/O. Assuming those are all ok, then log into MySQL and check the running queries, you can do so by running the command ‘show full processlist’. This will give you a list of queries running on the server. If you see a query that has been running for an excessively long time, you should investigate that query. See https://dev.mysql.com/doc/refman/5.1/en/show-processlist.html for additional details.

1
2
3
4
5
6
7
mysql&gt; show full processlist;
+-----+------+-----------+-----------+---------+------+-------+-----------------------+
| Id  | User | Host      | db        | Command | Time | State | Info                  |
+-----+------+-----------+-----------+---------+------+-------+-----------------------+
| 865 | root | localhost | wordpress | Query   |   -1 | NULL  | show full processlist |
+-----+------+-----------+-----------+---------+------+-------+-----------------------+
1 row in set (0.00 sec)
To investigate queries use the command ‘explain. When investigating queries, if you notice the lack of a primary key you should investigate if having a primary key for that particular table makes sense. Having a key in general improves performance of a table. See https://dev.mysql.com/doc/refman/5.0/en/explain.html for additional details.

1
2
3
4
5
6
7
mysql&gt; explain select * from wp_posts;
+----+-------------+----------+------+---------------+------+---------+------+------+-------+
| id | select_type | table    | type | possible_keys | key  | key_len | ref  | rows | Extra |
+----+-------------+----------+------+---------------+------+---------+------+------+-------+
|  1 | SIMPLE      | wp_posts | ALL  | NULL          | NULL | NULL    | NULL |   19 |       |
+----+-------------+----------+------+---------------+------+---------+------+------+-------+
1 row in set (0.01 sec)
Another item you should investigate is the slow query log file. If you look in /etc/mysql/my.cnf, you will notice 2 lines that relate to slow queries, make sure you uncomment them and restart MySQL. The long_query_time can be adjusted to say 10 seconds, so that any query running longer than 10 seconds is logged. See https://dev.mysql.com/doc/refman/5.1/en/slow-query-log.html for additional details.

1
2
#log_slow_queries       = /var/log/mysql/mysql-slow.log
#long_query_time = 2
Another thing you can do is enable logging for queries that are not using indexes. As mentioned above using indexes speeds up performance. In /etc/mysql/my.cnf uncomment the below line and restart MySQL. The log will be in the same place as mysql-slow.log.

1
#log-queries-not-using-indexes
Query cache is another item to check. MySQL caches queries and returns results from this cache if the table has not changed. This has a performance improvement of over 200%. You should check the query cache to ensure that there is no memory for the cache and that the cache is not having to be cleared for new items. Additional information can be found here https://dev.mysql.com/doc/refman/5.1/en/query-cache.html.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
mysql&gt; SHOW VARIABLES LIKE 'have_query_cache';
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| have_query_cache | YES   |
+------------------+-------+
1 row in set (0.00 sec)
 
mysql&gt; SHOW STATUS LIKE 'Qcache%';
+-------------------------+----------+
| Variable_name           | Value    |
+-------------------------+----------+
| Qcache_free_blocks      | 12       |
| Qcache_free_memory      | 16491184 |
| Qcache_hits             | 7645     |
| Qcache_inserts          | 5539     |
| Qcache_lowmem_prunes    | 0        |
| Qcache_not_cached       | 277      |
| Qcache_queries_in_cache | 156      |
| Qcache_total_blocks     | 334      |
+-------------------------+----------+
8 rows in set (0.00 sec)
How do you allow *only* SSL connections from remote users in MySQL?

mysql> UPDATE mysql.user SET ssl_type=’ANY’ WHERE user='<your-username>’