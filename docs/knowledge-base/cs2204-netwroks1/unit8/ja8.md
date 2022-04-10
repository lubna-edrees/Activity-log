# CS2204: unit 8: Journal Assignment

**1. DNS uses UDP instead of TCP. If a DNS packet is lost, there is no automatic recovery. Does this cause a problem, and if so, how is it solved?**

The DNS header contains 16-bit number as its ID. this number is chosen by the client, if a client sent a DNS packet with a specific ID, it will expect the server to send a DNS packet as a response with the same ID.

If no response is received with that ID after a specific period of time, the client will retransmit its packet again.

---

**2. Suppose that someone sets up a vacation reply and sends a message before logging out. Unfortunately, the recipient has also set up a vacation reply message. What will happen in this case? Will the canned replies keep on going back and forth until someone returns?**

In the early days of email systems, this may cause email loop which causes both clients to respond to each other infinitely; however, today, email clients with auto-responders set a header indicating that this an auto response message, which will break this loop after one message has been sent to the same recipient.

So, maybe the actual email will be sent from A to B, then B responds that the recipient is in vacation to A; then also A responds that the recipient is in vacation; then the loop will break;

so a sum of 3 emails may be sent, the actual email that is been sent before logging out, and a single auto-response from each client.

---

**3. When web pages are sent out, they are prefixed with MIME headers. why?**

Life was simpler when only text needed to be exchanged; however, there are several different MIME types available for HTTP responses right now, like: text/plain, text/html, application/xhtml+xml, application/json.

The headers needs to identify the MIME type of the document that is delivering so that browsers -or any consumers- can recognize it, and parse it correctly, then can be properly used.

---

**4. Does VoIP have same the problems with the firewall that streaming audio has?**

VoIP runs over UDP, while streaming audio runs over TCP; usually firewalls allow session based communication so TCP based connections are fine and won't face problems.

While for session-less communications like UDP are not allowed by default in firewalls due to security concerns, they can be allowed by opening UDP ports on the firewall;

---
