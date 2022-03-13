# unit 6: Journal

## Q1

In the TFTP protocol:

### Q1.1

**If the client changes its port number on a subsequent connection, but the server does not, what** **prevents**
**an old-duplicate data packet sent by the server from being accepted by the new client?**

- the old duplicate packets will still have the old port number; assuming that the port numbers are being issued
  correctly, then the new connection will -almost- never uses the same old port number;
- the new connection will use different port number, that the old packet does not know about.

---

### Q1.2

**If the server changes its port number on a subsequent connection, but the client does not, what** **prevents
an** **old-duplicate data packet sent by the server from being accepted by the new client?**

- once the new connection has been established on the new port number, the client will only accept packets sent
  from the server through that same new port number.
- the packet with the old port number, will reach the client, but will be discarded.

---

## Q2

**In an RPC-like protocol in which multiple requests can be outstanding, and replies can be sent in any order:**
**Assume that requests are numbered and that ACK[N] acknowledges reply[N]. Should ACKs be cumulative?If**  
**not,what should happen if an ACK is lost?**

- since the replies can be sent in any order, then the acknowledges can not be cumulative.
- the replies will arrive at any order, and ACKs will arrive at any order.
- the server needs to cache all replies that have been sent.
- once the transfer has been completed, the server should enter DALLY state, waiting for any late ACKs; then if
  there are missing ACKs, the server should consult its cache and retransmit requests with the missing ACKs,
  then re-enter DALLY state till all replies have been acknowledged.
