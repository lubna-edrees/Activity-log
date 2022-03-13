# Unit 6: Discussion assignment

## question

Consider a simple application-level protocol built on top of UDP that allows a client to retrieve a file from a
remote server residing at a well-known address. The client first sends a request with a file name, and the
server responds with a sequence of data packets containing different parts of the requested file. To ensure
reliability and sequenced delivery, client and server use a stop-and-wait protocol. Ignoring the obvious
performance issue, do you see a problem with this protocol? Think carefully about the possibility of processes
crashing.

## answer

- The system mentioned above is a simple TFTP system.
- stop-and-wait protocol requires the receiver (client) to send acknowledgements signals, after every successful
  receiving of a packet, failing to send the ACK, will stop the server from sending subsequent packets, and
  causes the lost packet to be retransmitted.
- There are multiple things that can go wrong in this implementation. some issues are generic to this type of
  implementations, and some are very specific to certain cases.
- as we mentioned earlier, packet loss is a very generic problem, the mentioned system uses stop-and-wait, so if
  a data packet[N] get lost, the receiver(client) won't be able to send ACK[N], and the server needs to
  retransmit packet[N] again.
- if packet[N] arrived to the client, but the client's ACK[N] get lost, the sender will retransmit the packet[N]
  again, then a duplicate packet[N] will arrive to the client, if the packets are not numbered properly, the
  received file will be corrupted.
- if -for any reason- delivering packet[N] keeps failing, after the timeout period, the client will retransmit
  the ACK[N-1] again, which may cause all the subsequent packets to be duplicated, this is known as Sorcerer’s
  Apprentice Bug, and the solution is to stop retransmit-on-timeout on the client side.
- if -for any reason- the client aborts the current transfer between a packet delivery, and started a new one;
  if the new connection happens to use the same port -on client and server side- the packet in-delivery from the
  aborted connection may arrive as a legitimate packet of the current connection, then the actual packet of the
  current connection will be discarded, the transfer will continue as normal. but the delivered file will be
  corrupted; this can be solved by choosing the port number of the new connection randomly and involve the OS in
  choosing the new port to prevent reissuing the same ports for the successive connections.
- if the bits used in the numbering block are not enough, that causes the number of packets to overflow and
  overlaps with a previous packet number; this can be solved by choosing enough bits to build the block number
  eg.16 bits which limits the file size to 32 MB.
- if the client's final ACK get lost, the server will keep retransmitting the final packet; the solution is for
  both the client and server to enter DALLY state.
- if the initial request from the client get retransmitted, 2 processes will start and 2 transfers will be
  established.

## references

- Dordal, P. (2019). An introduction to computer networks.
  https://eng.libretexts.org/Bookshelves/Computer_Science/Networks/Book%3A_An_Introduction_to_Computer_Networks_(Dordal)/07%3A_IP_version_4
