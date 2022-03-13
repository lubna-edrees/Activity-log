# Unit 6: written assignment

**Assuming standard 1500 byte Ethernet max payloads: how many IPv4 fragments will be needed to transfer 2000**
**bytes of user data with a single UDP send? And, how do the 2000 bytes get split over the frags?**

- IP header size = 20 bytes. UDP header size = 8 byes.
- available space from the Ethernet packet: 1500 - (20 + 8) = 1472 bytes.
- The first fragment will ship 1472 bytes of user data.
- The second fragment (last) will ship 2000 - 1742 = 528 bytes.
- it will be fragmented into 2 fragments, 1472 of data in the first; 528 bytes in the last.

---

**Despite its conceptual elegance, RPC (Remote Procedure Call) has a few problems. Discuss any 3 of those in**
**brief.**

1. IP-level fragmentation: if the data is so big, it needs to be fragmented at the IP level so that it can be
   transmitted successfully; this fragmentation may slow down the transfer;
2. possibility that the client or the server might crash and reboot: because this type of communication requires
   2 machines to stays in sync, at the start of the transfer and during it; the fact that the 2 machines may be
   different puts more possibility for failure.
3. if the client is single threaded, then it will stay freeze till it get the full reply from the server.

---

**Why is timestamps needed in real-time applications? This is in the context of Real-time Transport Protocol**
**(RTP)**.

- timestamps are used as block numbers in the real-time connections, which saving the sender from tracking the
  last received or sent packet; and also eliminates the need for caching packets; if a disruption happens on the
  link (eg.delay due to queueing), and a few packets got lost; the receiver can easily recover by putting the
  last received packet as the current (depending on its timestamp) and ignore all missing packets behind its
  timestamp.
- after recovery, if any of the missing packets arrived very late; its timestamp will be compared to the current
  timestamp, and if its from the past (eg. more than N RTTs) it can be discarded, knowing that injecting it this
  timestamp will corrupt data.

---

**Why does UDP exist? Would it not have been enough to just let user processes send raw IP packets?**

- well, UDP is on the layer 4, while IP is on the layer 3; the only responsibility of the IP packet is to
  deliver the **raw data** to the receiver machine; it does not -and it should not- worry about the content of
  the packet or how it should be presented to the internal processes at the receiver machine.
- UDP (or TCP) takes charge of picking up the data from the processes in the sender machine, do the necessary
  processing (marshaling), prepare the packet to be sent through IP, if fragmentation needed, UDP will handle
  that with th IP, putting this functions away from the processes themselves.
- on the receiver side, UDP will receive IP fragments; connect them back into one UDP packet (if necessary),
  then un-marshal them back into data that is suitable for the receiver processes and so on.
- The fact that IP packets might be in different sizes, and IP does not have the idea of ports; makes the use of
  UDP more convenient.

---

**Explain how QUIC eliminates a couple of RTTs usually needed at the start of a secure web connection.**

- QUIC uses UDP over TCP, adding the missing security standard to it.
- since QUIC is using UDP, it eliminates the need of establishing a secure connection before hand; the
  connection negotiation along with the first data request are to start transmitting with the first packet.
- QUIC eliminates the Handshake delay (Adam, 2017).

## References

- Langley Adam et al. (2017) The QUIC Transport Protocol: Design and Internet-Scale Deployment.
  http://www.audentia-gestion.fr/Recherche-Research-Google/46403.pdf
