# CS2204: unit 7: Journal

**What TCP message will be generated for an incoming SYN request for which there is no matching LISTENING port? What error will be given to the application that requested the connection?**

-   In the normal circumstances, when a client sends a SYN request, if the server is ready it will reply with an ACK, then the client acknowledges the server's response by another ACK and the three-way handshake is complete and the connection is established.
-   if no port is available -for any reason- the server won't acknowledge the SYN successfully, instead it will send a packet with RST bit set. This packet is being translated on the requester as **Connection Refused**.
-   The client may do another request with the correct port if necessary.
