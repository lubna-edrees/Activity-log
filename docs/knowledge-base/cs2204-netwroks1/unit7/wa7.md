# CS2204: unit 7: Written Assignment

## Q1

**Why does the maximum packet lifetime have to be large enough to ensure that not only the packet but also its acknowledgments have disappeared?**

-   this will help solving the old duplicates problem.
-   maximum packet lifetime is the maximum time a packet spend on the network before it gets discarded, if not arrived to its destination.
-   if the maximum packet lifetime is short, then a packet (or its ACK) may get lost before it has arrived to its destination, causing the other end to retransmit which may increase the possibility of duplicate packets.
-   references:
    -   Dordal, P. (2019). An introduction to computer networks.
        <https://eng.libretexts.org/Bookshelves/Computer_Science/Networks/Book%3A_An_Introduction_to_Computer_Networks_(Dordal)/07%3A_IP_version_4>

---

## Q2

**Give one potential disadvantage when Nagle's algorithm is used on a badly congested network.**

-   Nagle's algorithm buffers small packets until it reaches an agreed upon size then it sends them into one TCP/IP package.
-   consider an open ssh connection on TCP/IP protocol, without the Nagle's algorithm, the ssh will send a lot of small packets (eg. for every character you type in the terminal) which indicates ineffective use of the network.
-   instead, using the Nagle algorithm, will buffer these small packets, till you reach few characters (for example) and send them in one packet.
-   The problem arises if the Nagle's algorithm buffers its packet to a size that is larger than the network can handle, worsening the congestion on the network.
-   in this case, the packet may take longer time to arrive to the server causing the client to retransmit which increases the possibility of duplicate packets.
-   another problem might arise with the last packet, if another full packet has already been sent, this packet may never reach a full packet size, causing the client waiting for the ACK of the previous packet before sending this partial packet to the server, this may be a minor problem since the it will only adds few milliseconds of wait on the last packet.
-   references:
    -   Network Cyclopedia. (n.d.). What is Nagle’s algorithm? <https://networkencyclopedia.com/nagles-algorithm/>
    -   Stuart Cheshire (2005) TCP Performance problems caused by interaction between Nagle’s Algorithm and Delayed ACK

---

## Q3

**Give two examples of cases where TCP sends data-less packets on an established connection (which is not being torn down).**

-   A TCP has its window size reduced to 0, then this sender will keep sending data-less packets at regular intervals; each of those polling packets acknowledges the receiver's current ACK, till it receives the receiver's ACK containing window-enlargement announcement.
-   packets that its only purpose is to acknowledge a previous packet from the other end, might be also data-less.
-   references:
    -   Dordal, P. (2019). An introduction to computer networks. chapter 12.17 TCP flow control.

---

## Q4

**Exercise 5.0 from section 12.24 of the textbook:**

**1. Suppose you see multiple TCP connections on your workstation in state FIN_WAIT_1. What is likely going on? Whose fault is it?**

-   the host who is wishing to close the connection enters FIN_WAIT_1, waiting for the other end's acknowledgment of its FIN.
-   this state should not last long, unless the acknowledgment of the other end has been lost.
-   in this case, either the other end is not communicating, as if it is busy or stuck or even unexpectedly disconnected or shutdown; or the acknowledgment from the other end have not being arrived due to congestion on the network; or that our device is disconnected.
-   since we have multiple hosts with state, then the problem is probably on our side, mostly that our very close network is congested, or our device is disconnected.

**2.What might be going on if you see connections languishing in state FIN_WAIT_2?**

-   FIN_WAIT_2 happens after receiving the acknowledgements of our FIN, waiting for the other end's FIN;
-   before the other end can send its FIN, it must send us all of the remaining data from the connection, before the connection can be closed safely.
-   finding multiple connections on this state, means either these connections have large amount of data left, that need to be transmitted before the FIN; or we are not able to receive those FINs; or even our very close network is congested and all the FINs may arrive at once shortly.
-   finding multiple connections with this state indicates that the problem is on our side of the network.
