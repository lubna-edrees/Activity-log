# unit 1

## Abbreviations

-   ATM: Asynchronous Transfer Mode.
-   ISP: Internet Service Provider.
-   MAC: Media Access Control.

## definitions

### LAN

-   Local Area Network `physical, link layer`.
-   connect multiple machines within a local are.
-   in charge of actually delivering packets.
-   subdivided to`physical (down) , logical(above)`.
-   the physical layer deals with the analog, electrical or radio signaling.
-   the logical layer describes all logical (non-analog) operations on the packets.
-   physical layer is the LAN hardware.
-   logical layer is the kernel software interface to the LAN.
-   examples: Ethernet, Token Ring, ATM.

### IP

-   Internet Protocol `Internet network layer`. connect multiple LANs.

### TCP

-   Transport and Connection Protocol. `transport layer`. actually sending data.

## OverView of networks

### 1.1 Layers

-   layer is a library or interface to that can work directly (and only) with the layers (interfaces) immediately above and below it.
-   layer can only interact with its direct sibling
-   four-layer model:
    1. link: LAN
    2. network: IP.
    3. transport: TCP.
    4. application: your software.
-   so a message travels: application > TCP > IP > LAN.
-   application can talk to TCP only, not IP, not LAN. and so fourth.
-   **five-layer model**:
    1. link: LAN physical.
    2. link: LAN logical.
    3. network: IP.
    4. transport: TCP.
    5. application: your software.
-   five layers model: <https://www.loom.com/i/402dee371e9344c1921523e46d4c709d>

### 1.2 Data Rate, Throughput and Bandwidth

-   data rate is the number of bytes per second.
-   Throughput is the **overall effective transmission** putting into account things like transmission overhead,protocol ineffectiveness and competing traffic.
-   throughput used with higher network layers than data rate.
-   bandwidth is a synonym for data rate.
-   goodput: used with TCP, refers to `application-layer throughput`. the amount of usable data delivered to the
    receiving application.

### 1.3 Packets

-   Packets are modest-sized buffers of data, transmitted as a unit through some shared set of links.
-   prefixed with a header containing delivery information.
-   in datagram forewarning:
    -   the header contains destination address.
    -   headers use `virtual-circuit forwarding contain` instead of `an identifier for the connection`.
-   in LAN: packets are buffer and address on top of low-level serial lines. sometimes called `frames`.
-   in transport layer: packets are called `segments`.
-   maximum supported packet size by a LAN is an intrinsic attribute of this LAN.
-   Ethernet has a maximum size of 1500 bytes per packet. 14 bytes headers.
-   TCP/IP packets are 512 bytes per packet. TCP header is 20 bytes. IP header is 20 bytes.
-   Token Ring has a maximum size of 4KB per packet.
-   ATM has a maximum size of 48 bytes per packet.
-   issues happen on how to forward large-packet LAN to small-packet LAN.
-   Internal nodes of the network called `routers or switches` will then try to ensure that the packet is
    delivered to the requested destination.
-   The concept of packets and packet switching was first introduced by Paul Baran in 1962.
-   packets are buffers built of 8-bit bytes which is universal and understandable by hardwares.
-   The early Internet specifications introduced the term octet (an 8-bit byte) and required that packets be sequences of octets;

### 1.4 Datagram Forwarding

-   is a model of packed delivery that uses **stateless forwarding**.
-   packet headers contain destination address, routers and switches are in charge of delivering the packet to its
    destination.
-   each switch has a **forwarding table** of <destination, next_hop> pairs. when a packet arrives at the switch, the switch looks up its destination and forward it to the right next switch closer to the destination. and so on.
-   the forward table does not need to match the exact destination, a prefix of the IP address is enough.
-   switch forwarding example: <https://www.loom.com/i/469bf66565bd4cc1a178e2b942cae3fe>
-   **each packet is forwarded in isolation of the other packets**, the switches are not aware of the higher-level connections between packets or its endpoints.
-   alternative for datagram forwarding is **virtual circuits** in which the router maintains a state about each connection passes through it.
-   datagram forwarding might still get some other information beside the destination address, which are **quality of service information**.
-   **switches** act on the LAN layer and forward packets based on the LAN address.
-   **routers** acts on the IP layer and forward packets based on the IP address.

### 1.5 Topology

-   many LANs (in particular Ethernet) prefer “tree” networks with no redundancy (no loops), while IP has complex protocols in support of redundancy
-   **traffic engineering**: route selection of a specific route over another.
-   in datagram forwarding the path is only determined by the packet's destination.
-   At the LAN layer, traffic-engineering mechanisms are historically limited. At the IP layer, more strategies are available.

### 1.6 Routing loops

-   potential drawback in datagram forwarding is the possibility of **routing loops**: where a packet circulates back endlessly between 2 switches.
-   loops are caused by bad forwarding tables.
-   Ethernet fights loops by:
    -   relying on a linear routing loop.
    -   use TTl (time-to-live) where a packet is simply discarded if its TTL reaches 0. initial TTL is 64.
    -   prevent switches from sending a packet pack to its sender.

### 1.7 Congestion

-   congestion happens at a switch when:

    1. arriving packets to this switch are more than the switch can forward.
    2. the previous switch has a higher bandwidth, so they can send packets more than its next switch can handle.
    3. multiple switches send packets to the same destination through this same switch.

-   on case of congestion, a queue will be formed at the switch interface, and when the queue is full, all next packets will be **dropped**.
-   a congestion might be referred to when the **queue starts to build (knee, contention)** or when **the queue is full and the packets starts to get lost (cliff)**
-   In the Internet, most packet losses are due to congestion.
-   congestion is simply the **network’s feedback** that the **maximum transmission rate has been reached**.

### 1.8 packets

-   small size packets are useful for:

    1. represent the maximum size a sender can send at a time so it allows more senders to send at the same time.
    2. large packets size will leave the network unavailable for other senders while this sender is sending his large packet.
    3. if the packet is corrupted, the whole large packet needs to be transmitted versus if its on a small size, the process can be interrupted between packets.

-   the switch usually reads the whole packet before reading its headers, if the packet is too large then this process will take longer time before forwarding to the next switch and cause **forwarding delay**.
-   total packet delay from the sender to the receiver is the sum if the following:
    1.  bandwidth delay: forwarding from a machine with a higher bandwidth to another with lower bandwidth.
    2.  propagation delay: the time consumed for the packet travelling through the wires.
    3.  store-and-forward delay: the delay on each switch \* number of switches.
    4.  queuing delay: waiting in line on a busy routers.

### 1.9 LANs and Ethernet

-   LAN consists of:

    -   physical links that are serial lines.
    -   hardware to connect the links to the hosts.
    -   protocols that make everything work together.

-   Ethernet is a LAN that described in 1976 and has a bandwidth of 10 Mbps.
-   Ethernet started as **unswitched**, every host has a long wire that connects all of its stations (clients) and when a station (client) sends a message it will delivered to all other stations and its up to the receiver host to detect if this is addressed to him or not. and **collisions** could happen when 2 stations send at the same time.
-   Ethernet today are all **full switched**.
-   switched network advantages over unswitched network:

    1. every packet is only delivered to the host in which it is addressed to.
    2. collisions are uncommon is switched networks.
    3. **queuing** issue arises.
    4. prevents host-based eavesdropping although encryption is a better solution.

-   Ethernet is addresses are **6 bytes long**.
-   each Ethernet card **(network interface)** gets assigned a **unique address at the time of manufacturing**. that is been saved to its ROM. and called **physical address, hardware address, or MAC**
-   the first 3 bytes refers to the manufacturers, and the latest 3 bytes are serial number for the network interface.
-   **IP addresses get assigned administratively by the local site**.
-   The network interface continually monitors all arriving packets; if it sees any packet containing a destination address that matches its own physical address, it grabs the packet and forwards it to the attached CPU (via a CPU interrupt).
-   **broadcast address** allows one host to send a message to every other host that has the same broadcast address.
-   traffic to a single host called **unicast**.
-   Ethernet **does not scale well to large network sizes**. (up to 100k devices is fine).
-   Ethernet switches use **passive learning algorithm** to build its forwarding tables. (IP routers use **active protocols** ).
-   Ethernet switches has **flooding** mechanism as backup in case of **emergency or if the switch does not have information about the destination** in its forward table. the flooding includes sending the packet to **every other switch** that this switch connects to (like broadcasting message). and then it can be sorted from there.

### 1.10 IP Protocol

-   IP was developed to **solve the scaling issue of Ethernet** by allowing LANs to connect to each other in point-to-point links.
-   IP scales fine to up to 10<sup>10</sup> connected devices.
-   IP addresses are 4 bytes (32 bits) and are part of the IP header which follows the Ethernet headers. Ethernet headers **lives for one switch and changes on every switch** containing the address of the **next switch**. while the IP address header stay with the packet for **its whole journey**.
-   IP addresses can be divided into **network part(prefix)** and **host address** the rest of the address.
-   types of IP addresses <https://www.loom.com/i/45aea69eb9fd496381344094f45647d4>
-   IP address is **identifier and locator** while the Ethernet address (MAC) is **only identifier**.
-   all hosts with the same **IP network address** and must be located together on the same LAN.
-   IP must also support **fragmentation**, divide large packets to smaller size packets that can be supported by any switches with low bandwidth.
-   IP protocol: **we ship the packet off, and hope it gets there. most of the times it does**.
-   IP is **connectionless**
-   connectionless (IP) vs connection oriented protocols(TCP):
    1.  connectionless does not hold information about the connection state.
    2.  connectionless are **more reliable**, since they don't have connection state, they cannot lose it.
    3.  in connectionless networks, the packet routes might dynamically change according ot the network status.
    4.  connectionless makes it harder for providers to bill by connection.
    5.  **connection-oriented protocols** have better quality of service.
-   The most common form of IP packet loss is router queue overflows,

### 1.10.1 IP forwarding

-   IP routers use **datagram forwarding**, and the destination values are **network prefixed** that represent an entire LAB instead of individual host.
-   so the IP mission is to deliver to the **right LAN**, then **another process** will deliver to the exact host inside the LAN.
-   network prefixing **minimized the length of forward tables** of thr routers, which make everything faster, saves bandwidth, minimizing overhead.
-   **Internet backbone** are IP routers that specialize in large-scale routing on the commercial Internet, and which generally have forwarding-table entries covering all public IP addresses.
