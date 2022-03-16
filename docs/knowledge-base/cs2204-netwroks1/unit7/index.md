# CS2204: Unit7: The Transport Layer (TCP)

-   standard transport protocols riding above IP layer, are **TCP,UDP**.
-   UDP provides simple datagram delivery to remote sockets, that is, to <host,port> pairs.
-   TCP provides a much richer functionality for sending data to (connected) sockets.
-   TCP is **stream-oriented**: application can write data in small or large chunks and TCP layer will do the **packetization**. TCP transmit stream of bytes, not messages or records.
-   TCP is **connection-oriented**.
-   TCP is **reliable**: TCP uses sequence numbers to ensure the correct order of delivery and a timeout/retransmission mechanism to make sure no data is lost short of massive network failure.
-   TCP uses **sliding windows** by default, to achieve throughput relatively close to the maximum available.
-   TCP works fine for:

    1. transferring large files.
    2. interactive applications, each end is sending **and receive** streams of small packets.
    3. ssh, telnet, db connections as examples of interactive applications.
    4. request/reply protocols: sender sends one request and receives replies, then the connection is closed. not desirable due to the overhead of creating the connection.

-   if UDP opens a socket, then any client on the internet can transmit to that socket; so the UDP application needs to have mechanism to check that the socket is receiving messages from the right client **for every packet**.
-   with TCP all data coming into the **connected socket** must be sent form the legitimate client who opened the socket.
-   when the socket is not connected: it is ine **LISTENING** state.
-   to transmit to a TCP, client must open a connection defined by the **socketPair** as <IP_address, port> on both ends of the connection. for this connection a **new child socket S<sub>c</sub> is created, that includes creating a new thread or process**.

---

## 12.1 End-to-End principle

-   transport issues are the responsibility of the endpoints in question, and not the core network.
-   this addresses: **data corruption, and congestion**.
-   data corruption: all links on the internet have link-layer-checksums to protect against corruption; **but TCP still have to add its own checksum**.
-   TCP is the **only layer has congestion management**.

---

12.2 TCP Header

-   source and destination ports are **16-bits**
-   **4-bits** data offset specifies the number of **32-bits words** in the header. default value is **5**.
-   checksum covers:

    1. TCP header
    2. TCP data
    3. IP pseudo header that includes source and destination IP addresses.

-   the checksum must be updated by a **NAT router** that modifies any header values.

![tcp header](https://imgur.com/mjLGoCZ.png)

-   The sequence and acknowledgment numbers are for numbering the data, at the byte level.
-   TCP can send **1024-byte** blocks of data, incrementing the sequence number by 1024.
-   TCP can also send **1-byte** telnet packets, incrementing the sequence number by 1.
-   **There is no distinguish between the data and acknowledgements packets**: all packets from A to B are sending the most current acknowledgment from B to A. and vice versa.
-   **packets in TCP are called segments**
-   sequence numbers represent the **position** of the first byte of data. the acknowledgment number is **sequenceNumber + number of data bytes + 1** which represents the position of the first byte of data in the next segment.
-   The sequence and acknowledgment numbers, as sent, represent these **relative values plus an Initial Sequence Number**, or **ISN**, that is **fixed for the lifetime of the connection**. Each direction of a connection has its own ISN;
-   TCP acknowledgments are **cumulative**: when an endpoint sends a packet with an acknowledgment number of N, it is acknowledging receipt of all data bytes numbered less than N.

-   TCP header **flags**:
    1. **SYN**: for SYNchronize; marks packets that are part of the new-connection handshake.
    2. **ACK**: indicates that the header Acknowledgment field is valid; that is, all but the first packet.
    3. **FIN**: for FINish; marks packets involved in the connection closing.
    4. **PSH**: for PuSH; marks “non-full” packets that should be delivered promptly at the far end.
    5. **RST**: for ReSeT; indicates various error conditions.
    6. **URG**: for URGent; part of a now-seldom-used mechanism for high-priority data
    7. **CWR** and **ECE**: part of the Explicit Congestion Notification mechanism.

---

## 12.3 TCP connection establishment.

-   established with **three-way handshake** that involves three steps:

    1. C send a packet with **SYN** bit set to the S.
    2. S responds a **SYN** packet of its own; **ACK** flag is set.
    3. C acknowledges the **S's SYN** with its own **ACK**.

![tcp three-way handshake](https://imgur.com/A3AoYBc.png)

-   the three-way handshake is triggered by client; and any exchange of data should happen after the handshake completes. which means **one-RTT delay**.
-   three-way handshake is vulnerable to **SYN flooding**: client A sends large number of SYN packets to a server B; B must allocate resources for each SYN packet as if it is a legitimate connection request; then the server resources will be exhausted.
-   SYN flooding can be done with spoofed IP address, or large number of real clients trying to connect.
-   **SCTP** is an alternative to three-way handshake, to handle SYN flooding attacks, but it is not in TCP yet.
-   routine for closing the connection:
    1. client A send a packet with **FIN** set, announcing that it has finished sending data.
    2. server B acknowledges the **FIN** packet with an **ACK**.
    3. B continues sending any left data to the client A.
    4. When B finishes sending data; it sends a **FIN** packet.
    5. client B acknowledges the A's **FIN**; and this is the final packet.

![tcp closing connection](https://imgur.com/eBBiWd8.png)

-   and the connection flow would be:

![tcp connection flow](https://imgur.com/IIiPzeA.png)

-   If B had not been LISTENing at the port to which A sent its SYN, its response would have been RST (“reset”), meaning in this context “connection refused”. Similarly, if A sent data to B before the SYN packet, the response would have been RST.

-   a RST can be sent by either side at any time to abort the connection.
-   sometimes external attackers are able to tear down a TCP connection with a spoofed RST; this requires brute-force guessing the endpoint port numbers and the current SYN value
-   In the days of **4kB**window sizes, guessing a valid SYN was a one-in-a-million chance, but window sizes have steadily increased; with **4MB** window size makes SYN guessing quite feasible.
-   If A sends a series of small packets to B, then B has the option of assembling them into a full-sized I/O buffer before releasing them to the receiving application.
-   f A sets the PSH bit on each packet, then B should release each packet immediately to the receiving application.
-   if A has sent to B large amount of data, that B is busy processing it; the application may want to abort the connection immediately (eg. **pressing Ctrl-C in an ssh session**); this can be achieved by setting the **URG bit(flag)**, the TCP protocol then sends an **interrupt command** to the socket process.

---

## 12.5 TCP offloading

-   **TCP checksum offloading, TCO**: used to have the network-interface card to do the actual checksum calculations; this permits a modest amount of parallelism.
-   **TCP segment offloading, TSO**: hand the segmentation process to the **LAN hardware**, this **requires TCO**.
-   TSO can be divided into:

    1. LSO: large send offloading: the host system transfers to the network card a large buffer of data (perhaps 64 kB), together with information about the headers. The network card then divides the buffer into 1500-byte packets, with proper TCP/IP headers, and sends them off.
    2. LRO: large receive offloading: the network card accumulates multiple inbound packets that are part of the same TCP connection, and consolidates them in proper sequence to one much larger packet. This means that the network card, upon receiving one packet, must wait to see if there will be more. This wait is very short, however, at most a few milliseconds.

-   TSO is important in **very high bandwidth** systems.
-   At 10 Gbps, a system can send or receive close to a million packets per second, and offloading some of the packet processing to the network card can be essential to maintaining high throughput. TSO allows a host system to behave as if it were reading or writing very large packets, and yet the actual packet size on the wire remains at the standard 1500 bytes.

---

## 12.7 TCP state diagram

![tcp state diagram](https://imgur.com/WzmE8OQ.png)

-   a ladder diagram:

![tcp ladder diagram](https://imgur.com/ToX1JER.png)

-   client stats: CLOSED > SYNC_SENT > ESTABLISHED > FIN_WAIT_1 > FIN_WAIT_2 > TIME_WAIT.
-   server states: LISTEN > SYNC_RECT > ESTABLISHED > CLOSE_WAIT > LAST_ACK > CLOSED.

### 12.7.1 closing a connection

-   the first party to send FIN follows **active CLOSE** path; the other side will enter **passive CLOSE** path.
-   active CLOSE:

    1. A and B is ESTABLISHED.
    2. after sending the FIN, A enters **FIN_WAIT_1**
    3. upon receiving the the B's ACK of FIN, A enters **FIN_WAIT_2** waiting for data to be sent from B.
    4. after receiving the FIN of B; A enters **TIME_WAIT**.
    5. A sends ACK of B's FIN; and enters **CLOSED**

-   passive CLOSE:

    1. A and B is ESTABLISHED.
    2. after receiving the A's FIN; B enters **CLOSE_WAIT**.
    3. B sends all of its data to A;
    4. B sends its FIN; and enters **LAST_ACK** where it waits for A's ACK.
    5. B enters **CLOSED**.

-   A TCP endpoint is half-closed if it has sent its FIN (thus promising not to send any more data) and is waiting for the other side’s FIN; this corresponds to A in the diagram above in states FIN_WAIT_1 and FIN_WAIT_2.
-   A TCP endpoint is half-open if it is in the ESTABLISHED state, but during a lull in the exchange of packets the other side has rebooted; this has nothing to do with the close protocol. As soon as the ESTABLISHED side sends a packet, the rebooted side will respond with RST and the connection will be fully closed.
-   A simultaneous close – having both sides send each other FINs before receiving the other side’s FIN

![tcp close](https://imgur.com/pBxReap.png)

### 12.7.2 calling close()

-   Most network programming interfaces provide a close() method for ending a connection; it usually closes bidirectionally and so models the TCP closure protocol rather imperfectly.

-   A’s application calls shutdown(), thereby promising not to send any more data. A’s FIN is sent to B. A’s application is expected to continue reading, however.
-   The connection is now **half-closed**.Onreceipt of A’s FIN,B’s TCP layer knows this. If B’s application attempts to read more data, it will receive an end-of-file indication (this is typically a read() or recv() operation that returns immediately with 0 bytes received).
-   B’s application is now done reading data, but it may or may not have more data to send. When B’s application is done sending, it calls close(), at which point B’s FIN is sent to A. Because the connection is already half-closed, B’s close() is really a second half-close, ending further transmission by B.
-   A’s application keeps reading until it too receives an end-of-file indication, corresponding to B’s FIN.
-   The connection is now fully closed. No data has been lost.

---

## 12.8 TCP old duplicates

-   the most serious threat facing the integrity of TCP data is **external old duplicates**.
-   very late packets from a previous instance of the connection. Suppose a TCP connection is opened between A and B. One packet from A to B is duplicated and unduly delayed, with sequence number N. The connection is closed, and then another instance is reopened, that is, a connection is created using the same ports. At some point in the second connection, when an arriving packet with seq=N would
    be acceptable at B, the old duplicate shows up. Later, of course, B is likely to receive a seq=N packet from the new instance of the connection, but that packet will be seen by B as a duplicate (even though the data does not match), and (we will assume) be ignored.

![external old packet problem](https://imgur.com/iulRROH.png)

-   solution: include connection count.
-   TCP is also vulnerable to sequence-number wraparound: arrival of an old duplicates from the same instance of the connection. However, if we take the MSL to be 60 seconds, sequence-number wrap requires sending 232 bytes in 60 seconds, which requires a data-transfer rate in excess of 500 Mbps.
-   TCP offers a fix for this (Protection Against Wrapped Segments, or PAWS), but it was introduced relatively late;

---

## 12.9 TIME_WAIT

-   The TIMEWAIT state is entered by whichever side initiates the connection close;
-   in the event of a **simultaneous close**, both sides enter TIMEWAIT.
-   TIMEWAIT lasts for a time 2 \* MSL, where **MSL = Maximum Segment Lifetime** is an agreed-upon value for the maximum lifetime on the Internet of an IP packet.
-   TIMEWAIT was 60 seconds, but now is **30 seconds**.
-   functions of TIMEWAIT:

    1.  to solve the external-old-duplicates problem.
    2.  address lost final-ack problem

-   TIMEWAIT requires that between closing and reopening a connection, a long enough interval must pass that any packets from the first instance will disappear. After the expiration of the TIMEWAIT interval, an old duplicate cannot arrive.
-   If host A sends its final ACK to host B and this is lost, then B will eventually retransmit its final packet, which will be its FIN. As long as A remains in state TIMEWAIT, it can appropriately reply to a retransmitted FIN from B with a duplicate final ACK
-   TIMEWAIT only blocks re-connections for which both sides reuse the same port they used before. If A connects to B and closes the connection, A is free to connect again to B using a different port at A’s end.
-   the host must thus maintain for each of its ports a list of all the remote <IP_address,port> sockets currently in TIMEWAIT for that port. If a host is connecting as a client, this list likely will amount to a list of recently used ports; no port is likely to have been used twice within the TIMEWAIT interval.
-   If a host is a server, however, accepting connections on a standardized port, and happens to be the side that initiates the active close and thus later goes into TIMEWAIT, then its TIMEWAIT list for that port can grow quite long.
-   Generally, busy servers prefer to be free from these bookkeeping requirements of TIMEWAIT, so many protocols are designed so that it is the **client that initiates the active close**.
-   In an environment in which many short-lived connections are made from host A to the same port on server B, port exhaustion – having all ports tied up in TIMEWAIT – is a theoretical possibility.
-   early Berkeley-Unix TCP implementations often made only about 4,000 ports available to clients; with a 120-second TIMEWAIT interval, port exhaustion would occur with only 33 connections per second.

---

## 12.10 three-way handshake revisited

-   the original TCP specification, for the ISN to be determined by a special clock, incremented by 1 every 4 microseconds.
-   ISN is used to detect duplicated packets.
-   if A sends a SYN, restarts, and sends the SYN again as part of a reopening the same connection, the arrival of a second SYN with a new ISN means that the original connection cannot proceed, because that ISN is now wrong.
-   The receiver of the **duplicate SYN should drop any connection state** it has recorded so far, and **restart processing the second SYN from scratch**.
-   The **clock-driven ISN** also originally added a second layer of protection against external old duplicates.
-   Suppose that A opens a connection to B, and chooses a clock-based ISN N1. A then transfers M bytes of data, closed the connection, and reopens it with ISN N2. If N1 + M < N2, then the old-duplicates problem cannot occur: all of the absolute sequence numbers used in the first instance of the connection are less than or equal to N1 + M, and all of the absolute sequence numbers used in the second
    instance will be greater than N2. In fact, early Berkeley-Unix implementations of the socket library often allowed a second connection meeting this ISN requirement to be reopened before TIMEWAIT would have expired;

### 12.10.1 ISN and spoofing

-   The clock-based ISN proved to have a significant weakness: it often allowed an attacker to guess the ISN a remote host might use.
-   early version of Berkeley Unix, instead of incrementing the ISN 250,000 times a second, incremented it once a second, by 250,000 (plus something for each connection). By guessing the ISN a remote host would choose, an attacker might be able to mimic a local, trusted host, and thus gain privileged access.
-   The IP-spoofing technique was used in the 1994 Christmas Day attack against UCSD, launched from Loyola’s own apollo.it.luc.edu; the attack was associated with Kevin Mitnick though apparently not actually carried out by him. Mitnick was arrested a few months later.
-   in May 1996, introduced a technique for introducing a degree of randomization in ISN selection, that insures:
    1. the same ISN won't be used twice in a row for the same connection.
    2. `ISN = C(t) + hash(local_addr, local_port, remote_addr, remote_port, key)` where C(t) is 4-microseconds clock; key is a random value chosen by the host.
-   RFC 5925 addresses spoofing and related attacks by introducing an optional TCP authentication mechanism: the TCP header includes an option containing a secure hash of the rest of the TCP header; and **a shared secret key**.

---

## 12.11 Anomalous TCP scenarios

-   TCP addresses the Duplicate Connection Request (Duplicate SYN) issue by noting whether the ISN has changed. This is handled at the kernel level by TCP, versus TFTP’s application-level (and rather desultory) approach to handing Duplicate RRQs.
-   TCP addresses Loss of Final ACK through TIMEWAIT: as long as the TIMEWAIT period has not expired, if the final ACK is lost and the other side re-sends its final FIN, TCP will still be able to reissue that final ACK. TIMEWAIT in this sense serves a similar function to TFTP’s DALLY state.
-   External Old Duplicates, arriving as part of a previous instance of the connection, are prevented by TIME- WAIT, and may also be prevented by the use of a clock-driven ISN.
-   Internal Old Duplicates, from the same instance of the connection, that is, sequence number wraparound, is only an issue for bandwidths exceeding 500 Mbps: only at bandwidths above that can 4 GB be sent in one 60-second MSL; solution is **PAWS: Protection Against Wrapped Segments**; PAWS adds a 32-bit “timestamp option” to the TCP header. The granularity of the timestamp clock is left unspecified;
    ne tick must be small enough that sequence numbers cannot wrap in that interval (eg less than 3 seconds for 10,000 Mbps), and large enough that the timestamps cannot wrap in time MSL.
-   The PAWS mechanism also requires ACK packets to echo back the sender’s timestamp, in addition to including their own. This allows senders to accurately measure round-trip times.
-   Reboots are a potential problem as the host presumably has no record of what aborted connections need to remain in TIMEWAIT. TCP addresses this on paper by requiring hosts to implement Quiet Time on Startup: no new connections are to be accepted for 1\*MSL.

---

## 12.12 TCP faster opening

-   There have been periodic calls to allow TCP clients to include data with the first SYN packet and have it be delivered immediately upon arrival – this is known as accelerated open.
-   If there will be a series of requests and replies, the simplest fix is to pipeline all the requests and replies over one persistent connection; the one-RTT delay then applies only to the first request.
-   If the pipeline connection is idle for a long-enough interval, it may be closed, and then reopened later if necessary.
-   **T/TCP, or TCP for Transactions,**: introduced a connection count TCP option, called CC; each participant would include a 32-bit CC value in its SYN; each participant’s own CC values were to be monotonically increasing.
-   Accelerated open was allowed if the server side had the client’s previous CC in a cache, and the new CC value was strictly greater than this cached value. This ensured that the new SYN was not a duplicate of an older SYN.
-   The recent TCP **Fast Open proposal**, described in RFC 7413, involves a secure “cookie” sent by the client as a TCP option; if a SYN+Data packet has a valid cookie, then the client has proven its identity and the data may be released immediately to the receiving application. Cookies are cryptographically secure, and are requested ahead of time from the server.
-   Because cookies have an expiration date and must be requested ahead of time, TCP Fast Open is not fundamentally faster from the connection-pipeline option, except that holding a TCP connection open uses more resources than simply storing a cookie. The likely application for TCP Fast Open is in accessing web servers. Web clients and servers already keep a persistent connection open for a while,
-   but often “a while” here amounts only to several seconds; TCP Fast Open cookies could remain active for much longer.

---

## 12.13 Path MTU discovery

-   CP connections are more efficient if they can keep large packets flowing between the endpoints.
-   Once upon a time, TCP endpoints included just 512 bytes of data in each packet that was not destined for local delivery, to avoid fragmentation.
-   TCP endpoints now typically engage in Path MTU Discovery which almost always allows them to send larger packets;
-   backbone ISPs are now usually able to carry **1500-byte packets**. The Path MTU is **the largest packet size that can be sent along a path without fragmentation**.
-   The IPv4 strategy is to send an initial data packet with the IPv4 DONT_FRAG bit set. If the ICMP message Frag_Required/DONT_FRAG_Set comes back, or if the packet times out, the sender tries a smaller size.
-   If the sender receives a TCP ACK for the packet, t might try a larger size. Usually, the size range of 512-1500 bytes is covered by less than a dozen discrete values; the point is not to find the exact Path MTU but to determine a reasonable approximation rapidly.
-   IPv6 has no DONT_FRAG bit. Path MTU Discovery over IPv6 involves the periodic sending of larger packets;
-   if the ICMPv6 message **Packet Too Big** is received,a smaller packet size must be used. RFC 1981 has details.

---

## 12.14 TCP sliding windows

-   Window sizes are measured in terms of bytes rather than packets; this leaves TCP free to packetize the data in whatever segment size it elects.
-   In the initial three-way handshake, each side specifies the maximum window size it is willing to accept, in the Window Size field of the TCP header.
-   This 16-bit field can only go to 64 kB, and a 1 Gbps \* 100 ms bandwidth \* delay product is **12 MB**;
-   as a result, there is a TCP Window Scale option that can also be negotiated in the opening handshake. The scale option specifies a power of 2 that is to be multiplied by the actual Window Size value.
-   TCP may either transmit a bulk stream of data, using sliding windows fully, or it may send slowly generated interactive data; in the latter case, TCP may never have even one full segment outstanding.
-   the window size included in the TCP header is known as the **Advertised Window Size**. On startup, TCP does not send a full window all at once; it uses a mechanism called **“slow start”**.

---

## 12.15 TCP delayed ACKs

-   TCP receivers are allowed briefly to delay their ACK responses to new data. This offers perhaps the most benefit for interactive applications that exchange small packets, such as ssh and telnet.
-   If A sends a data packet to B and expects an immediate response, delaying B’s ACK allows the receiving application on B time to wake up and generate that application-level response, which can then be sent together with B’s ACK. Without delayed ACKs, the kernel layer on B may send its ACK before the receiving application on B has even been scheduled to run.
-   If response packets are small, that doubles the total traffic. The maximum ACK delay is 500 ms, according to RFC 1122 and RFC 2581.
-   acknowledging too many data packets with one ACK can interfere with the self-clocking aspect of sliding windows; the arrival of that ACK will then trigger a burst of additional data packets, which would otherwise have been transmitted at regular intervals.
-   ACK be sent, at a minimum, for **every other data packet**.

---

## 12.16 Nagle Algorithm

-   attempts to improve the behavior of interactive small-packet applications.
-   It specifies that a TCP endpoint generating small data segments should queue them until either it accumulates a full segment’s worth or receives an ACK for the previous batch of small segments.
-   If the full-segment threshold is not reached, this means that only one (consolidated) segment will be sent per RTT.
-   As an example, suppose A wishes to send to B packets containing consecutive letters, starting with “a”. The application on A generates these every 100 ms, but the RTT is 501 ms. At T=0, A transmits “a”. The application on A continues to generate “b”, “c”, “d”, “e” and “f” at times 100 ms through 500 ms, but A does not send them immediately. At T=501 ms, ACK(“a”) arrives;
    at this point A transmits its backlogged “bcdef”. The ACK for this arrives at T=1002, by which point A has queued “ghijk”. The end result is that A sends a fifth as many packets as it would without the Nagle algorithm. If these letters are generated by a user typing them with telnet, and the ACKs also include the echoed responses,
    then if the user pauses the echoed responses will very soon catch up.

---

## 12.17 TCP flow control

-   It is possible for a TCP sender to send data faster than the receiver can process it. When this happens, a TCP receiver may reduce the advertised Window Size value of an open connection, thus informing the sender to switch to a smaller window size. This provides support for flow control.
-   The window-size reduction appears in the ACKs sent back by the receiver. A given ACK is not supposed to reduce the window size by so much that the upper end of the window gets smaller. A window might shrink from the byte range [20,000..28,000] to [22,000..28,000] but never to [20,000..26,000].
-   If a TCP receiver uses this technique to shrink the advertised window size to 0, this means that the sender may not send data. The receiver has thus informed the sender that, yes, the data was received, but that, no, more may not yet be sent. This corresponds to the ACK<sub>WAIT</sub>
-   Eventually, when the receiver is ready to receive data, it will send an ACK increasing the advertised window size again.

---

## 12.18 silly window syndrome

-   TCP transfers only small amounts of data at a time.
-   Because TCP/IP packets have a minimum fixed header size of 40 bytes, sending small packets uses the network inefficiently.
-   The silly-window syndrome can occur when either by the receiving application consuming data slowly or when the sending application generating data slowly.
-   As an example involving a slow-consuming receiver, suppose a TCP connection has a window size of 1000 bytes, but the receiving application consumes data only 10 bytes at a time, at intervals about equal to the RTT. The following can then happen:

    -   The sender sends bytes 1-1000. The receiving application consumes 10 bytes, numbered 1-10. The receiving TCP buffers the remaining 990 bytes and sends an ACK reducing the window size to 10.
    -   Upon receipt of the ACK, the sender sends 10 bytes numbered 1001-1010, the most it is permitted. In the meantime, the receiving application has consumed bytes 11-20. The window size therefore remains at 10 in the next ACK.
    -   the sender sends bytes 1011-1020 while the application consumes bytes 21-30. The window size remains at 10.

-   The sender may end up sending 10 bytes at a time indefinitely. This is of no benefit to either side; the sender might as well send larger packets less often. The standard fix, set forth in RFC 1122, is for the receiver to use its ACKs to keep the window at 0 until it has consumed one full packet’s worth (or half the window,
    for small window sizes). At that point the sender is invited – by an appropriate window-size advertisement in the next ACK – to send another full packet of data.
-   The silly-window syndrome can also occur if the sender is generating data slowly, say 10 bytes at a time. The Nagle algorithm, above, can be used to prevent this, though for interactive applications sending small amounts of data in separate but closely spaced packets may actually be useful.

---

## 12.19 TCP timeouts and retransmits

-   When TCP sends a packet containing user data (this excludes ACK-only packets), it sets a timeout. If that timeout expires before the packet data is acknowledged, it is retransmitted.
-   Acknowledgments are sent for every arriving data packet (unless Delayed ACKs are implemented).
-   this amounts to receiver-side retransmit-on-duplicate. Because ACKs are cumulative, and so a later ACK can replace an earlier one, lost ACKs are seldom a problem.
-   For TCP to work well for both intra-server-room and trans-global connections, with RTTs ranging from well under 1 ms to close to 1 second, the length of the timeout interval must adapt.
-   TCP manages this by maintaining a running estimate of the RTT, EstRTT. In the original version, TCP then set TimeOut = 2ˆEstRTT (in the literature, the TCP TimeOut value is often known as RTO, for Retransmission TimeOut). EstRTT itself was a running average of periodically measured SampleRTT values, according to `EstRTT = 𝛼ˆEstRTT + (1-𝛼)ˆSampleRTT`

---

## 12.20 KeepAlive

-   There is no reason that a TCP connection should not be idle for a long period of time;
-   TCP supports an optional KeepAlive mechanism: each side “polls” the other with a **data-less** packet.
-   KeepAlive timeout was 2 hours, but this could be reduced to 15 minutes. If a connection failed the KeepAlive test, it would be closed.

### 12.21 TCP timers

-   **TimeOut**: a per-segment timer; TimeOut values vary widely
-   **2 \*MSL TIMEWAIT**: a per-connection timer
-   **Persist**: the timer used to poll the receiving end when winsize = 0
-   KeepAlive;

---
