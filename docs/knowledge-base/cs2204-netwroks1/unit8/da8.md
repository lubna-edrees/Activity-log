# CS2204: unit 8: Discussion Assignment

**Choose ONE of the below security topics from chapter 22 of the Dordal (2019) course text. Research the topic, then provide a summary of the technology and how it works**.

**1. Network Intrusion Detection**
**2. Secure Shell (SSH)**
**3. Transport Layer Security (TLS)**
**4. Public Key Encryption**

---

-   TLS is a security protocol that allows client/server applications to communicate in a way that is designed to prevent eavesdropping, tampering, or message forgery.
-   TLS is used to encrypt communications between a server and a client such as browser, email client, VoIP.
-   TLS evolved from SSL.
-   HTTPS is an implementation of HTTP + TLS.
-   TLS can help with: encryption, authentication, integrity where TLS can check if data has been changed or manipulated in its way through the network.
-   The server needs to have SSL certificate.
-   TLS starts with a handshake between client and server, where the TLS version, cipher suite, and session keys is being set.
-   during the handshake, the server is being authenticated and identified according to its TLS certificate.
-   this handshake sets up a ciphered communication session, according to the encryption keys that both client and server agreed upon.
-   for both client and server, before they send message -either request or response- the packet is being encrypted according to the encryption keys agreed upon, then the TLS on the other side of the communication will authenticate the sender and decipher packet data, then deliver it to the recipient.

references:

-   CloudFlare (n.d.) What is TLS (Transport Layer Security) https://www.cloudflare.com/en-gb/learning/ssl/transport-layer-security-tls/
