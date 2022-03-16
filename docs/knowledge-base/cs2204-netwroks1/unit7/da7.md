# cs2204: unit 7: Discussion Assignment

**Simultaneous TCP connection initiations are rare, but simultaneous connection termination is relatively common. How do two TCP nodes negotiate the simultaneous sending of FIN packets to one another? Draw the ladder diagram, and label the states on each side. Which node goes into TIMEWAIT state?**

---

-   let's start by explaining the normal circumstances; in which the host who wishes to close the connection sends its FIN packet and enters the **active close** path; while the other end will enter the **passive close** path.
-   the active close path, starts from **ESTABLISHED** state; then this host sends its FIN packet, call it FIN1, and enters **FIN_WAIT_1**; upon receiving the other end's ACK of FIN1, this host enters the **FIN_WAIT_2** state where it waits for any data that is left to be sent from the other end; once the other end finishes sending data it sends its own FIN, call it **FIN2**,
    then this host enters the **TIMEWAIT** state; after that, it will send the ACK of FIN2 and enters the **CLOSED** state.
-   the other host starts the closing process by receiving the FIN1 signal where its state changes to **CLOSE_WAIT**; then it sends all the data to the other end; the sends its own FIN, we called it FIN2, and enters the **LAST_ACK** state where it waits for the ACK of FIN2; and then enters the **CLOSED** state.

![tcp close](https://imgur.com/pBxReap.png)

-   so in the normal circumstances, the host who wishes to end the connection enters the **TIMEWAIT** state; but the newer versions of TCP, requires the client to always initialize the closing routine, since this will save the server from having to save the connection connection data, to make sure the same client can not use the same port very soon.

---

## References

-   Dordal, P. (2019). An introduction to computer networks.
    <https://eng.libretexts.org/Bookshelves/Computer_Science/Networks/Book%3A_An_Introduction_to_Computer_Networks_(Dordal)/07%3A_IP_version_4>
