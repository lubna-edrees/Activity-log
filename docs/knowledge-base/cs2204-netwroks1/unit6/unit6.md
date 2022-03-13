# Unit 6

## definition

-   **bottleneck**: the slowest link in delivering packets.
-   **RTT**: round-trip time, the time that a packet consumed from its sending till its arrival.

## 6. ABSTRACT SLIDING WINDOWS

-   Build reliable data-transport layers on top of unreliable lower layers.
-   Can be achieved by used **retransmit-on-timeout** policy.
-   Retransmit-on-timeout (achieve **reliability**)

    -   If packet is transmitted and no acknowledgment received during the timeout period, the packet will be
        resent.
    -   Protocols use this called: ARQ protocols: Automatic Repeat reQuest.

-   Sliding windows algorithm is used to manage congestions and not giving the network more packets than it can
    handle.
-   End-to-End principle suggest that building reliability on the lower layers is wrong, instead reliability
    should be built on the endpoints of a connection, as ARQ and retransmit-on-timeout do.

---

## 6.1 Building Reliable transport: Stop-and-Wait

-   Retransmit-on-timeout requires **sequence numbering for the packets**.
-   if the network guarantees that the packets won't be reordered we can omit the sequence numbers.
-   but **no-reordering is not guaranteed on the Internet** so we have to use sequence numbers.
-   Data[N] wil be the packet number N, and ACK[N] will be the acknowledgment number N.

-   **stop-and-wait is a version of retransmit-on-timeout** where the sender sends **only one outstanding packet
    (Data[N])** at a time and **waits for ACK[N]** to be received. if ACK[N] is not received, Data[N] will be
    retransmitted. Data[N+1] will never be retransmitted until ACK[N] is received.

---

## 6.1.1 Packet Loss

-   in case of packet loss, the receiver won't receive packet[N] so the sender will retransmit Data[N] again.
-   if the receiver receives a packet and send ACK, but **the ACK get lost** and never received by the sender, so
    the sender will transmit Data[N] again and the receiver will receive **duplicate copies of Data[N]**
-   the receiver usually implements **retransmit-on-duplicate** policy, so in the case of receiving a duplicate
    packets it will sent the same ACK[N].
-   at least one side must implement **retransmit-on-timeout** policy, either the receiver or the sender;
    otherwise a lost packet will lead to **deadlock** as the server and the sender will wait forever. **AND** the
    other end must implement either **retransmit-on-timeout OR transmit-on-duplicate** policy.
-   it is fine for the sender and receiver to implement **retransmit-on-timeout** policy with **different timeout
    value**.

---

## 6.1.2 Sorcerer’s Apprentice Bug

-   A strange thing happens if **one side** implements retransmit-on-timeout but **both sides** implement
    retransmit-on-duplicate.
-   if the ACK[N] delayed then all of the later packets will be **sent twice**.
-   thee transfer will still work normally, but it will take double the bandwidth.
-   Fix: have one side (usually the sender) to implement **retransmit-on-timeout only** policy **as in TCP
    protocol**.

---

## 6.1.3 Flow Control

-   stop-and-wait has a flow control to **prevent data from arriving at the receiver faster than it can be
    handled**.
-   if the receiver needs less or slightly larger time than RTT (round-trip time) everything will work fine with
    stop-and-wait.
-   if the receiver needs much more time than RTT (round-trip time) then the packet might be **timed out and**
    **retransmitted from the sender** since the receiver won't send the ACK until packet is completely received
    and transmitted.
-   one solution is have 2 types of Acknowledgments:
    1. **ACK<sub>Wait</sub>[N]** which means that data has been received but receiver is not ready yet for Data[N
       +1]
    2. **ACK<sub>GO</sub>[N]** which means that data has been received and processed by receiver and it is ready
       for the next packet.
-   a problem may arise if the **ACK<sub>GO</sub>[N]** is lost, then the connection is deadlock since the receiver
    and the sender keep waiting for each other.

---

## 6.2 Sliding Windows

-   stop-and-wait is very **reliable but not very efficient**.
-   most links with **multi-hop stop-and-wait path** will remain idle most of the time, which is a thing that we
    don't want.
-   we can work around by allowing the sender to send few packets without waiting for their acknowledgments, but
    this bad since the packets may:

    1. end up in waiting queues on switches a long the way.
    2. packets get lost (discarded if the queues are full).
    3. packets get lost (discarded if the receiver does not have enough bandwidth).

-   **sliding windows**:

    1. the sender picks a **window size** of packets that can be transmitted without waiting for their
       acknowledgments.
    2. **acknowledgments are accumulative** which means that ACK[N] will never been sent until the receiver
       **has** **received all acknowledgment ACK[k] for k <= N**.
    3. the sender keeps tracking of a variable representing the last ACK received.
    4. sender will send multiple packets equals to the window size and waits for the ACK of the last packet.
    5. with every new ACK received, the sender updates the last ACK received variable, and the window slides by
       **[last ACK + window size]**.

-   sliding-windows is **self-clocking** so that it automatically reduces the sender rate whenever the available
    fraction of the bottleneck bandwidth is reduced.
-   self-clocking property happens since the sliding will happen according to the pace of the slowest link
    (bottleneck).
-   example [https://vimeo.com/150452468](https://vimeo.com/150452468)

---

## 6.2.1 Bandwidth \* Delay

-   BDP (bandwidth delay product) = bandwidth \* delay
-   BDP0 (**transit capacity** = amount of data can be sent before the first response) = bandwidth \* RTT
-   BDP0 is the optimal value for the window size
-   if the chosen **windowSize > BDP0** then RTT] will grow due to the queues that will form on the links, so the
    new RTT[actual] is different from the RTT[no-load] in the beginning.
-   choosing windowSize less than BDP0 means that we are not using all network power.
-   chosen windowSize less than BDP0 means that we are introducing queues somewhere in the network.
-   **in practice** neither the bandwidth or RTT is constant, so that the windowSize keep changing according to
    the other traffic in the network (which changes the available bandwidth then BDP).

---

## 6.2.2 The receiver side

-   if the transmission happens through a single link, then the packets will never be reordered and windowSize of
    1 works perfectly.
-   with the user of switches, no-reordering is not guaranteed, so the receiver has to use the same windowSize as
    the sender.
-   if the windowSize is [11,12,13,14] and the receiver received 12,13,14 packets but 11 is delayed, then the
    receiver must buffer [12,13,14] packets waiting for the 11 to arrive.
-   receiver also keeps track of **lastSentACK**, and at any time the receiver is willing to accept the packet
    **Data[lastSentACK + 1]** and when this packet arrived the receiver needs to **check its buffers to see if**
    **subsequent packets are in the buffer**, so the receiver process them and send the **the largest accumulative
    ACK** for the latest received packet

---

## 6.2.3 Loss Recovery with sliding-windows

-   if windowSize is 4 and packet[5] is lost, then the sender will only receive ACK[4].
-   sender will only **retransmit packet[5]** then waits for the next ACK.
-   if the receiver has received packets, 6,7,8 then it will send ACK[8] and the receiver **will not retransmit**
    the packets 6,7,8. and window will slide [9-13].
-   if the packets 6,7,8 have also **lost**, then the sender will receive ACK[5] and sender will retransmit the
    packets 6,7,8 and the window will slide [5-9].
-   the packets 6,7,8 will timeout shortly after packet[5] timeout. in this case, sliding-windows protocol will
    **suppress further retransmission until recovery is complete**.
-   **pipeline drain** happens when the sliding-windows goes into **halt after full timeout**, after recovery from
    the full timeout, the sliding-windows needs to **startup again**.
-   most **TCP implementations** has **fast recovery** for early detection of packets loss before the pipeline has
    fully drained.

---

## 6.3 Linear bottlenecks

![links](https://i.imgur.com/TcclRiw.png)

-   **bottlenecks** are the slowest links (eg. R2-R3, R3-R4 in the image above), they are most likely where the
    queues will form.
-   when using slide-windows, the sending rate will adjusted according to the bottleneck rate.

---

### 6.3.1 Simple Fixed-window-size analysis

-   we will analyze the windowSize on overall throughput on RTT.

![fixed-window-size analysis example](https://imgur.com/BJT1yHg.png)

-   in the diagram above, bottleneck is R1-R2. any queues will form at R1.
-   the bottleneck bandwidth is 1 packet/sec so **the path bandwidth** is 1 packet/sec.
-   there are 4 links, each of them consumes 1 sec. so the **RTT = 4 secs**. (assuming the ACN path is infinitely
    fast so that can be omitted).

![another fixed-window-size analysis example](https://imgur.com/ybsXYbK.png)

-   bottleneck is S1-S2. any queues will form at S1.
-   the path bandwidth is 1 packet/sec (equals to the bottleneck bandwidth).
-   RTT = 4 secs. (0 (C-S1, infinitely fast) + 1 sec (S1-S2) + 1 sec (S2-D) + 1 sec (D-S2, for ACK) + 1 sec
    (S2-S1, for ACK) + 0 sec (S1-C, for ACK), infinitely fast ).

-   **NOTE 1**: in both example the propagation delay is assumed to be zero and omitted.
-   **NOTE 2**: we assume a single connection is made. BDP = bandwidth \* RTT = 4.

lets analyze different scenarios with different windowSize:

## 6.3.1.1 case 1: windowSize = 2

-   windowSize < BDP.
-   every ACK will take BDP = 4 to arrive.
-   throughput: 2 packets in 4 seconds = 2/4 = 0.5 packet/sec. (50% of the bandwidth is utilized).

![cas1](https://imgur.com/OSBsGlo)

-   notice the brief **pile-up (queue)** on the bottleneck on startup.
-   in the steady state, no queues are formed.
-   notice that during each second: **2 of the 4 links remain idle**.
-   RTT for packet[4] is 9 secs.
-   steady state achieved at time 9.

---

### 6.3.1.2 case 2: windowSize = 4

-   windowSize = BDP.
-   every ACK will take BDP = 4 to arrive.
-   throughput: 4 packets in 4 seconds = 4/4 = 1 packet/sec. (100% of the bandwidth is utilized).

![case2](https://imgur.com/GOtY4mg.png)

-   notice the queue on R1 lasts longer on startup, but after that no queues are formed.
-   RTT fro packet[4] is 7 seconds.
-   steady state achieved at time T = 4.
-   this is the best possible throughput.
-   at every second, all links are busy.
-   this case is the **congestion knee**.

---

### 6.3.1.3 case 3: windowSize = 6

-   windowSize > BDP.
-   every ACK will take BDP = 4 to arrive.
-   throughput: 4 packets in 4 seconds = 4/4 = 1 packet/sec. (100% of the bandwidth is utilized).

![case3](https://imgur.com/sdBIE0O.png)

-   notice the heavy queue on R1.

---

## 6.3.2 RTT calculations

-   RTT no-load is physical travel time that is subjective to the limitations of delay; any tine excess RTT
    no-load is spent waiting in queues.
-   so **queueTime = RTT actual - RTT no-load**.
-   When the bottleneck link is saturated, that is, is always busy, the number of packets actually in transit (not
    queued) somewhere along the path will always be bandwidth ˆ RTTnoLoad.
-   and **throughput = windowSize/RTTactual** where “throughput” is the rate at which the connection is sending
    packets.
-   In the sliding windows steady state, where throughput and RTTactual are reasonably constant, the average
    number of packets in the queue is just throughput \* queue_time (where throughput is measured in packets/sec):
-   so **queue_usage = throughput \* (RTTactual – RTTnoLoad) = winSize \* (1 – RTTnoLoad/RTTactual)**
-   and **RTTactual = winSize/bottleneck_bandwidth queue_usage = winSize – bandwidth \* RTTnoLoad**
-   **RTTactual/RTTnoLoad = winSize/transit_capacity = (transit_capacity + queue_usage) / transit_capacity**

---

## 6.3.3 Graphs at the Congestion Knee

![graphs at the Congestion Knee](https://imgur.com/8qXQEAP.png)

-   The critical windowSize value is equal to bandwidth ˆ RTTnoLoad; this is known as the congestion knee.

-   For winsize below this, we have:

    -   throughput is proportional to winsize
    -   delay is constant
    -   queue utilization in the steady state is zero
    -   connection power is proportional to the windowSize.

-   For winsize larger than the knee, we have

    -   throughput is constant (equal to the bottleneck bandwidth)
    -   delay increases linearly with winsize
    -   queue utilization increases linearly with winsize
    -   connection power is proportional to the 1/windowSize.

-   Ideally, winsize will be at the critical knee. However, the exact value varies with time: available bandwidth
    changes due to the starting and stopping of competing traffic, and RTT changes due to queuing. Standard TCP
    makes an effort to stay well above the knee much of the time, presumably on the theory that maximizing
    throughput is more important than minimizing queue use.

-   **connection power = throughput / RTT**

![connection power](https://imgur.com/vv4Zat3.png)

---

## 6.3.4 Simple Packet-Based Sliding-Windows Implementation

-   pseudo code outline of the receiver side of a sliding-windows implementation, ignoring lost packets and
    timeouts.

```pseudo
Receiver side:

W: winsize
LA: last_ACKed = 0

The next packet expected is LA+1
Window is [LA+1, . . . , LA+W]

use EarlyArrivals data structure:
    EarlyArrivals is an array of objects of size W.
    we always out Data[M] at the index of of M % W

Upon arrival of Data[M]:
    if M <= LA or M > LA+W, ignore the packet
    if M > LA+1, put the packet into EarlyArrivals.
    if M == LA+1:
        deliver the packet (that is, Data[LA+1]) to the application
        LA = LA+1 (slide window forward by 1)
        while (Data[LA+1] is in EarlyArrivals) {
            output Data[LA+1]
            LA = LA+1
        }
        send ACK[LA]
```

-   pseudo code outline of the sender side of a sliding-windows implementation, ignoring lost packets and
    timeouts.

```pseudo
Sender side:

W: winsize
LA: last_ACKed = 0

start by sending a full windowFull of packets. Data[1, ..., W]


Upon arrival of ACK[M]:
    if M <= LA or M > LA+W, ignore the packet
    otherwise:
        set K = LA + W + 1, the first packet just above the old window
        set LA = M, just below the bottom of the new window
        for (i=K; i <= LA+W; i++)
            send Data[i]
```

---

---

## 11. UDP transport

-   TCP and UDP works above IP layer.
-   UDP provides simple datagram delivery to remote sockets \<host, port\>.
-   TCP provides much more richer functionality for sending data, but requires the remote socket first to be
    connected.
-   in this chapter:
    1. introduce UDP.
    2. introduce UDP-based Trivial File Transfer Protocol.
    3. fundamental issues any transport protocol must address:
        - lost final packets
        - late arriving packets.

---

## 11.1 User DataGram Protocol UDP

-   it is in [RFC 1122](https://datatracker.ietf.org/doc/html/rfc1122.html).
-   UDP is almost a **null protocol**, since it is very basic.
-   UDP adds 2 functionalities above IP layer:
    1. port numbers.
    2. checksum.
-   UDP header:

    ![UDP header](https://imgur.com/XTlw5Kb.png)

-   using port number, an application can connect to a **an individual server process that owns this port number**
    instead of connecting to the host as whole.
-   **UDP is unreliable**: no reattempt-at-timeout, acknowledgments, or retransmission.
-   **socket** = UDP <host,port>
-   **UDP is unconnected (stateless)**: if an application opens a port on a host; any other host on the internet
    can deliver packets to the socket <host,port> with no questions asked.
-   UDP packets uses **16-bit Internet checksum**: checksum can be disabled by setting all-16-bits to 0.
-   UDP checksum contains:

    1. UDP header.
    2. UDP data.
    3. pseudo-IP header: source and destination IP addresses.

-   UDP packets can be can be dropped due to:

    1. queue overflow\*\* on an intermediate router.
    2. queue overflow on the host: data is arriving faster than the receiver

-   Higher level protocol use acknowledgment to form flow control that prevents packets from being dropped.
-   UDP is popular for **local** transport into the same LAN.
-   UDP is the base transport basis for **Remote Procedure Call, RCP**: a host invokes a procedure in another
    host, where the parameters and the return value of the procedure are transported back and forth through UDP.
-   **UDP is good for request-reply connections**: TCP can be used, but it requires additional overhead of
    creating and destroying the connection.
-   **DNS uses UDP** over TCP for the above reason, but if we have a **sequence** of request-reply operations,
    then **TCP is worth the overhead**.
-   **UDP is popular for real-time transport**: with TCP if a packet is lost, the receiving host has no other
    option but to queue the subsequent packets till the lost packet arrives, which may tack several RTTs.
-   UDP is better for real-time transport, since it give the receiving host the option to just ignore the lost
    packets, so that UDP is good for voice and video transport which are **loss-tolerant but delay-intolerant**.
-   **Real-time Transfer Protocol, RTP is built on top of UDP** because of its loss-tolerance.
-   **VoIP uses UDP over TCP**.
-   **UDP is used in flooding attacks**: since it is easy to send UDP packets with spoofed IP addresses; with TCP
    is not hard to send TCP connection-request (SYN) packets with spoofed IP addresses, but the connection won't
    last till the malicious packets have been delivered to the application process.
-   **UDP enables traffic amplification attacks**: the attacker sends a small message to a server, with spoofed
    source address, and the server then responds to the spoofed address with a much larger response message.
-   One approach is for the server to limit the size of its response – ideally to the size of the client’s request
    until it has been able to verify that the client actually receives packets sent to its claimed IP address.

---

## 11.1.1 QUIC

-   UDP allows new protocols to run as user-space applications, no kernel updates are required.
-   **QUIC Quick UDP Internet Connection** is a protocol created by google to support HTTPS (HTTP + TLS).
-   **QUIC allows supporting multiplexed streams in a single connection**: a lost packet will block its stream
    until retransmits, while other streams continue without waiting.
-   **QUIC supports error-correcting codes**.
-   QUIC eliminates the **initial RTT** needed to create the TCP connection.
-   QUIC provides support for advanced congestion control (on the application layer, new versions do this entirely
    on the server end).
-   One downside of QUIC is its nonstandard programming interface.

---

## 11.1.2 DCCP

-   **DCCP Datagram Congestion Control Protocol**
-   outlined in RCF 4340.
-   build on top of UDP.
-   adds number of TCP-like features to UDP.
-   DCCP packets are delivered to the application in **\*the order of arrival** rather than the order of sequence
    numbers.
-   DCCP uses Acknowledgments, but for **congestion control**.
-   DCCP does support reliable delivery of control packets, used for connection setup and teardown, and option
    negotiation.
-   DCCP packets includes:

    -   application-specific UDP prot number
    -   **32-bit service code**: allows **finer-grained packet handling** which identifies the incoming packets and
        prevent conflicts.

-   DCCP run on the **operating system kernel** (opposite to QUIC which runs on the user-space): because the ECN
    congestion-feedback mechanism requires setting flag bits in the IP header, and most kernels do not allow
    user-space applications to do this.

---

## 11.1.3 UDP Simplex-Talk

-   One of the early standard examples for socket programming.
-   the client side reads text from the user's terminal and sends them through the network to the server, which
    put them in the server's terminal.
-   the server don't send **any response or ACKs**, so it is **one way flow**.
-   **simplex refers to the one-way flow** (opposite to duplex-talk used in Instant Messaging IM ).
-   the server side must select a port number, which with the server’s IP address will form the **socket address**
    to which clients connect.
-   On the server side, simplex-talk must do the following:

    -   ask for a designated port number
    -   create a socket, the sending/receiving endpoint
    -   bind the socket to the socket address, if this is not done at the point of socket creation
    -   receive packets sent to the socket
    -   for each packet received, print its sender and its content

-   The client side has a similar list:

    -   look up the server’s IP address, using DNS
    -   create an “anonymous” socket; we don’t care what the client’s port number is
    -   read a line from the terminal, and send it to the socket address <server_IP,port>

### 11.1.4 netcat

-   **netcat or nc** is a utility that enables sending and receiving **UDP and TCP** packets.

---

## 11.1.5 binary data

-   when sending a binary data packets through UDP, **the client and server must agree on encoding**.
-   **big-endian** encoding is used by IBM.
-   **little-endian** encoding is used by Intel.
-   big-endian encoding is the most used, and known as **network byte order**.
-   converting from **host byte order** to **network byte order** is language-dependent. but should always assume
    big-endian encoding
-   In java, the client needs to convert `int[] to byte[]`, then the receiving server needs to convert the packet
    back from `byte[] to int[]`. the **DataOutputStream** and **DataInputStream** help in the converting
    operations.
-   In the C language, we can simply allocate a char[] of the appropriate size and write the network-byte order
    values **directly** into it.

---

## 11.2 Trivial File Transport Protocol TFTP

-   **TFTP supports file transfer in both directions**.
-   **TFTP does not support authentication**: all files are available to everyone.
-   **TFTP is UDP-based, well-suited for downloading startup files**
-   **TFTP uses stop-and-wait**: with fixed timeout interval.
-   **TFTP used in internal LANs because its limited security**.
-   TFTP documented in RFC 783, and in RFC 1350.
-   TFTP has 5 packet types:

    1. Read ReQuest, RRQ: contains filename and text/binary indication.
    2. Write ReQuest, WRQ.
    3. Data: **16-bit** block number then up to **512 bytes** of data.
    4. ACK, 16-bit block number.
    5. Error, All errors other than “Unknown Transfer ID” are cause for sender termination.

-   All blocks of data contain 512 bytes except the final block, which is identified as the **final block**; if
    the data divisible by 512, the final block will be sent containing **0 bytes of data**.
-   TFTP must take care of packetization (UDP, opposed to TCP which takes care of packetization),
-   TFTP must use **small block size to avoid fragmentation**.
-   The TFTP server listens on UDP port 69 for arriving RRQ packets, the server will create **separate process or
    thread** for every requested file as **child process**;
-   the new child process will have **entirely new UDP port**, and it will be used for further communication with
    this client.
-   the new port will:

    1. prevent old-duplicate packets.
    2. child process will be responsible for handling one client only,
    3. all packets are now arriving to the port of the child process.
    4. downside: f preventing the use of TFTP through NAT firewalls

-   without port change, handling multiple clients will be very complicated, as the server would have to sort out,
    for each arriving packet, which transfer it belonged to. Each transfer would have its own state information
    including block number, open file, and the time of the last successful packet.

-   TFTP file requests work as follows:
    1. The client sends a RRQ to server port 69.
    2. The server creates a child process, which obtains a new port, s_port, from the operating system.
    3. The server child process sends Data[1] from s_port.
    4. The client receives Data[1], and thus learns the value of s_port. The client will verify that each future
       Data[N] arrives from this same port.
    5. The client sends ACK[1] (and all future ACKs) to the server’s s_port.
    6. The server child process sends Data[2], etc, each time waiting for the client ACK[N] before sending
       Data[N+1].
    7. The transfer process stops when the server sends its final block, of size less than 512 bytes, and the
       client sends the corresponding ACK.

---

## 11.3 Fundamental Transfer issues

These issues includes:

-   old duplicate packets
-   lost final ACK
-   duplicated connection request
-   reboots

## 11.3.1 old duplicate packets

-   **packets from the past arriving very late, but being accepted as current**.
-   **external old duplicate**: the previous connection has been closed, then a new connection has been opened
    (same socket and ports), then a delayed packet of the previous connection appears in the right order of the
    new connection, so it is being accepted as a legitimate packet of the current connection => file transfer will
    be corrupted.
-   **internal old duplicate**: happens in the same connection instance, . For example, if TFTP allowed its 16-bit
    block numbers, then a very old Data[3] might be accepted in lieu of Data[3+(2^16)]. these are usually
    prevented by numbering the data,and use sufficiently enough bits to prevent number overlapping.
-   to prevent **internal duplicates due to number overlapping**, and since it uses 16-bit numbering, the maximum
    file size (51B \* max number of packets numbering) = 512B = ((2^16) - 1) = **32 MB**.
-   port numbers should be chosen randomly, so that the probability that the same number is chosen twice in
    immediate succession is very low.
-   to prevent **external duplicates**, TFTP requires a new port number for each new connection (separate
    transfer):

    -   if ports chosen randomly, there are 1/(2^32) that the same port number will used twice.
    -   if ports were chosen by OS, we assume that OS won't reissue the same port twice in **rapid succession**.
    -   if one side (client or server) choses the same port, the probability the same 2 ports will be chosen is
        1/(2^16).

-   reasons why the packet from the old connection arriving late:

    -   A first copy of the old duplicate was sent
    -   A routing error occurs; the packet is stuck in a routing loop
    -   An alternative path between the original hosts is restored, and the packet is retransmitted successfully
    -   Some time later, the packet stuck in the routing loop is released, and reaches its final destination

-   TCP officially once has a limit of 60 seconds, (now is 30 seconds) to assume that all old packets are now
    discarded and it is safe to reopen the connection with the same ports again.
-   IP considers 255 seconds as the safe time.
-   It is also possible to prevent external old duplicates by including a connection count parameter in the
    transport or application header. For each consecutive connection, the connection count is incremented by (at
    least) 1. A separate connection-count value must be maintained by each side; if a connection-count value is
    ever lost, a suitable backup mechanism based on delay might be used.

---

## 11.3.2 lost final ACK

-   The final packet is alway an ACK, **which can not be Acknowledged**.
-   TFTP **recommend** the sender to enter the **DALLY state** after sending the final ACK.
-   in the DALLY state, the receiver **responds to duplicated final ACK**, by **retransmitting the final ACK back
    to the sender**.
-   receiver does not respond to the single final ACK, and the sender will exit the DALLY state shortly.
-   The time of the DALLY state should be **twice the timeout of the receiver at least**. so the sender can retry
    sending the final ACK **3 times**.
-   Note also that dallying only provides increased assurance, not certainty: it is possible that all final ACKs
    were lost.
-   The TCP analogue of dallying is the **TIMEWAIT** state, which also prevents old duplicates.

---

## 11.3.3 Duplicated connection requests

-   we need to distinguish between duplicated connection requests (same connection) and requests to open a new
    connection.
-   scenario: client send RRQ('foo') > client aborts connection foo > client sends RRQ('bar') > server responds of
    Data[1] of foo connection.
-   if the client starts the new connection from a new port, it is fine, the data of the previous connection will
    be sent to the **old port**.
-   **TFTP does not have cancellation message**.
-   if -for unexpected reason- the client sends the new connection from the same port, then it is a problem.
-   in case of duplicate connection requests, the server will start **2 different processes**, then the receiver
    should accept one successfully, and responds with **ERROR of Unknown Transfer** **ID to the second process**,
    transfer ID refers to the port number.
-   the ERROR state from the receiver causes the associated process to **shutdown**, and the other process to
    continue normally.
-   It is theoretically possible for a malicious actor on the LAN to take advantage of this TFTP “latching on”
    behavior to hijack anticipated RRQs, and sends malicious data to all ports of the victim (the client).

---

## 11.3.4 reboots

-   one side might reboot between receiving the messages form the other side, the other side must detect the
    reboot and close the old connection.
-   if the **receiver (client) reboots**, the sender will keep sending packets but no further ACK will be
    received.
-   rebooted side will lose all its memory, which may lead to the possibility of reusing the same port in the
    post-reboot connection.
-   In practical terms, this scenario seems to be of limited importance, though “diskless” devices often do use
    TFTP to request their boot image file when restarting, and so might be potential candidates.

---

## 11.4 other TFTP notes

### 11.4.1 TFTP and the sorcerer

-   TFTP uses stop-and-wait, its ACK includes the block number of the packet being acknowledged.
-   TFTP was vulnerable to the Sorcerer’s Apprentice bug.
-   fix: the sender (ie, the side originating the DATA packets) must never resend the current DATA packet on
    receipt of a duplicate ACK.

### 11.4.2 TFTP states

-   DALLY state.
-   UNLATCHED: when the client-receiver sends RRQ, it does not know the port number to **latch on yet**.
-   ESTABLISHED: when the client-receiver receives DATA[1], the port number is now known, and the connection is
    ESTABLISHED.
-   ERROR.

### 11.4.3 TFTP throughput

-   on a **single ETHERNET**, sender and receiver will alternate using the same channel, so the **throughput is**
    **optimal**.
-   As soon as the store-and-forward delays of switches and routers are introduced (**multiple ETHERNETs**),
    though, stop-and-wait becomes a performance bottleneck.

---

## 11.5 Remote Procedure Call RPC

-   **usually** implemented on to of UDP.
-   example is **DNS**: a host sends a DNS look up request to the DNS server and receives a reply.
-   RPC is also quite successful as the mechanism for interprocess communication within CPU clusters, perhaps its
    most time-sensitive application.
-   requests and replies **must be numbered**, so the client knows which reply is to which request, and the reply
    can serve as acknowledgment to the request.
-   Request[N] timeout When the server creates reply[N] and sends it to the client, it must also keep a cached
    copy of the reply, until such time as ACK[N] is received.
-   After sending reply[N], the server may receive ACK[N], indicating all is well, or may receive request[N]
    again, indicating that reply[N] was lost, or may experience a timeout, indicating that either reply[N] or
    ACK[N] was lost. In the latter two cases, the server should retransmit reply[N] and wait again for ACK[N].
-   **exactly-once semantics**:
    1. RPC connection between client and server.
    2. neither client nor server crashed.
    3. no packet reordering.
    4. every request, reply, ACK arrives to its destination (no data loss).

---

## 11.5.1 Network File System

-   the application making the greatest use of early RPC was **Sun's Network File System, NFS**
-   allowed to the file system of the server to be available for clients.
-   client opens a file => server responds with file handle, that includes the file **inode number**.
-   client sends: `read(dataBlockNumber)` => server responds with Data of **8KB packets**.
-   client sends: `write(dataBlockNumber, dataToBeWritten)` => server responds with ACK.
-   Usually an 8 kB block of data would be sent as a single UDP/IPv4 packet, using IPv4 fragmentation by the
    sender for transmission over Ethernet.

---

## 11.5.2 Sun RPC

-   developed by Sun Microsystems, documented in RFC 1831.
-   now officially known as **Open Network Computing ONC**.
-   **ACKs was omitted**.
-   server stops caching replies, since ACK was omitted. so the server will re-execute the requests on duplicated
    requests.
-   **at-least-once semantics**:

    1. client sent a request, and received a reply.
    2. the client is sure that the request has been executed at least once.
    3. if the reply got lost, the client will retransmit the request and the request will be re-executed bu the
       server.

-   **idempotent request**: is a request that has the same results and the same side effects on the server wether
    executed once or twice or more.
-   **at-least-once semantics** allow the server to be **stateless**
-   The lack of file-locking and other non-idempotent I/O operations, along with the rise of cheap client
    workstation storage (and, for that matter, more-reliable servers), eventually led to the decline of NFS over
    RPC, though it has not disappeared. NFS can, if desired, also be run (shamefully) over TCP.

### 11.5.3 Serial Execution

-   serial execution is automatic if request[N+1] serves as implicit ACK[N].
-   Disk drives commonly use the elevator algorithm to process requests.

### 11.5.4 RPC Refinements

-   One basic network-level improvement to RPC concerns the avoidance of IP-level fragmentation
