# CS2204: unit 8: Application Layer and Security

## [b] Application Layer

-   Application layer is the layer were users interact with.
-   2 principles: client-side principle, peer-to-peer principle.

### 3.1 **Client-side principle**

-   the oldest model.
-   This model comes naturally from the mainframes and minicomputers that were the only networked computers used until the 1980s.
-   model protocol: the set of rules that define the format of messages exchanged and their ordering: **syntax and organization of information**.
-   characters encoded in **ASCII**, where each character is defined by **7 bits** then transferred as **8 bits** where the first left (most significant bit) is set to **0**.
-   **Backus-Naur Form (BNF)** are set of rules that generate all valid characters strings.
-   big-endian: sends the **most significant bit** followed by the **least significant bit**.
-   little-endian: sends the **least significant bit** followed by the **most significant bit**.
-   a host is either a server or a client, the servers serves large number of clients.

### 3.1.1 the peer-to-peer model

-   emerged in the last ten years.
-   all hosts work as both servers and clients at the same time.
-   used in: Internet telephony, file sharing, and Internet-wide file systems.

### 3.1.2 the transport services

-   2 types of transport services:
    -   connectionless or diagram services
    -   connection-oriented or byte-stream services
-   connectionless:

    -   allow applications to easily exchange messages or **service data units**
    -   uses UDP
    -   unreliable, but able to detect transmission errors.
    -   several networked applications may be running at the same time on a single host.
    -   each networked application can be identified by:

        1. the host in which the application is running
        2. the port number in which the application is listening

    -   on the Internet, the host is the network address, the port number is an integer.
    -   IPv4 addresses are 32 bits, represented by a dotted decimal where each decimal represents one **byte** of the address, 4 parts each represent a byte.
    -   IPv6 addresses are 128 bits, uses hexadecimal numbers (16 bits) separated by colons, 8 parts each represent a 16-bit (2 bytes).
    -   used when short queries and responses are exchanged.

-   connection-oriented
    -   creates a reliable byte stream between the 2 applications.
    -   applications are identified by their hos and their port numbers.
    -   use TCP.
    -   reliable and bidirectional.
    -   used when longer responses are expected.

---

### 3.2.1 The Domaine name system

-   names are used as an aliases for IP addresses.
-   change your ISP will change the IP address of the host or application.
-   started with one file: `hosts.txt`:
    -   contains the mapping between the name of each Internet host and its associated IP address.
    -   It was maintained by SRI International that coordinated the Network Information Center (NIC).
    -   when a new host comes available, a system admin will register the host name and IP address in this file.
    -   operating systems have this file stored somewhere in the filesystem, and update it regularly form the RSI server.
-   today hosts are saved in a `tree` structure, where the top level is the country code or generic suffix like, gov, com ..
-   hosts registration are managed by Internet Corporation for Assigned Names and Numbers (ICANN).
-   This grammar specifies that a host name is an ordered list of labels separated by the dot (.) character. Each label can contain letters, numbers and the hyphen character (-) 4. Fully qualified domain names are read from left to right. The first label is a hostname or a domain name followed by the hierarchy of domains and ending with the root implicitly at the right.
    The top-level domain name must be one of the registered TLDs 5.
-   For example, www.whitehouse.gov corresponds to a **host** named `www` inside the `whitehouse` **domain** that belongs to the `gov` **top-level domain**.
-   info.ucl.ac.be corresponds to the `info` domain inside the `ucl` domain that is included in the `ac` **sub-domain** of the `be` top-level domain.

-   DNS:

    -   distributed **database** that contains mappings between fully qualified domain names and IP addresses.
    -   uses client server model: clients are host need to retrieve the IP addresses of other hosts stored in the DNS database.
    -   each **nameserver** stores part of the DNS database and answer queries by clients.

-   root nameserver:

    -   Each root nameserver maintains the list of all the nameservers that are responsible for each of the top-level domain names and their IP addresses.
    -   All root nameservers are synchronised and provide the same answers.
    -   By querying any of the root nameservers, a DNS client can obtain the nameserver that is responsible for any top-level-domain name. From this nameserver, it is possible to resolve any domain name.

-   DNS resolvers:

    -   resolver is a server that provides the resolution service for a set of clients.
    -   each host sends all its DNS queries to the **local resolver**
    -   These queries are called **recursive queries** as the resolver must recurse through the hierarchy of nameservers to obtain the answer.
    -   advantages:
        1. regular internet hosts dont need to keep a list of up-to-date host services.
        2. hosts dont need to send their DNS queries over the Internet, since the local resolver caches large number of hosts so it can return quickly and saves bandwidth.

-   DNS protocol:

    -   runs above both datagram and byte-stream services.
    -   DNS messages are in 5 parts:

        1. Header: (mandatory), information about the type of the message, information about other parts of the message: 12 bytes.
        2. Question: (mandatory), information about the question that is been sent to the resolver.
        3. Answer: (mandatory), information about the answer to the question above, when a client sends a query, this section is empty.
        4. Answer: (optional), information about the servers that can provide authoritative answer if required.
        5. additional information: (optional), any additional information needs to be sent to the resolver.

    -   DNS Header (12 bytes):

        -   ID: 16-bit random number chosen by the client, the server (resolver) need to return this id to the client so client can know to which question this answer belongs.
        -   QR flag: 0 in the query(question), 1 in the answer.
        -   Opcode: specify the type of query, eq. standard query.
        -   AA bit: set if the server (resolver) has an authority for the domain name in question. The authoritative servers are managed by the system administrators responsible for a given domain, and the always store the most up-to-date information.
        -   RD: recursion desired: set bu **client** with the request, the resolver will recurse through the DNS hierarchy to retrieve the answer on behalf of the client.
        -   RA: one-bit indicates if the server supports recursion.
        -   RCODE: distinguish between different types of errors.
        -   The last four fields indicate the size of the Question, Answer, Authority and Additional sections of the DNS message.
            ![dns header](https://imgur.com/X7VMK6S.png)

    -   last 4 sections of the DNS message (Question, Answer, Authority and Additional Information) contain **Resource Record (RR)**
    -   Resource Record (RR):

        -   Name: the name of the node this resource associated with.
        -   Type (2 bytes = 16 bits):
        -   Class: used to support the utilization of the DNS in environments other than the internet.
        -   TTL: lifetime of RR in seconds, set by the server, indicates how long the RR answer can set in the cache. long TTL = stable RR.
        -   RDLength: length of RData field that contains information about the type specified in the type field.
        -   RR Types:
            -   type A: encode IPv4 address.
            -   type AAAA: encode IPv6 address.
            -   type ANS: the name of the DNS server.
            -   type CNAME: (canonical name) used to define aliases,eg. www.example.com could be a CNAME for pc12.example.com that is the actual name of the server on which the web server for www.example.com runs.

    -   **PTR (pointer) RR**:
        -   obtain the name that corresponds to an IP address.
        -   IP address will be sent in the question and the answer will contain the domain name.
        -   so that RR Name is the IP address, while RData contains the domain name.
        -   suffix **.in-addr.arpa** needs to be added to the IP address.

---

### 3.2.2 Electronic mail

-   appeared in the 70s.
-   email system has 4 components:
    1. message format: defines how the valid email messages are encoded.
    2. protocols: that allows hosts and servers to exchange email messages.
    3. client software: allow users to create and read email messages.
    4. software: allow servers to effectively exchange messages.
-   email messages:

    -   contains header and body.
    -   lines of ASCII characters, each line contains 998 characters terminated by CR and LF.
    -   empty line marks the end of the header.

-   email header:

    -   several lines, each line starts with keyword then colon then the value. as: `key:value\n`
    -   2 lines are mandatory, **From** line `From: (name: optional)\< sender email address >`, and **the Date** line.
    -   Other header lines (optional):
        -   TO: email address of the receiver.
        -   cc: email addresses to receive a copy, separated by commas.
        -   bcc: email addresses to receive **blind carbon copy**.
        -   subject.
        -   message id.
        -   in-reply-to: holds the id of the message that this message is replying to.
        -   Received: used when the message is processed by several email servers before reaching its destination.
        -   MIME-Version: MIME-Version specification used to encode this email. eg. '1.0', if no MIME-Version then the email encoded with ASCII.
        -   Content-Type: indicates how the message is structured:
            -   `multipart/mixed`: email contains several independent parts, eg. plain text and binary data.
            -   `multipart/alternative`: email contains several representations of the same information, eg. bot plain text and HTML version of the same text.
        -   Content-Transfer-Encoding: specify how the message has been encoded, default is **7-bit ASCII**, popular: **quoted-printable, base64**

-   ASCII characters was limited to other languages than english and to other encodings like binary files.
-   to solve ASCII problems, the **IETF** developed the **Multipurpose Internet Mail Extensions (MIME)**: allow email to carry non-ASCII characters and binary files without breaking the email servers.
-   to support 2 types of mime messages, the receiver must be able to extract the different parts of the message, separation uses special lines to define the boundaries between parts of a MIME message, eg **-LAST_LINE-**, to solve this, the content type may contain another parameter to define the boundary that has been used eg. `Content-Type: multipart/mixed; boundary="simple boundary"`,
    so that an empty line contain the text '--simple boundary' indicates the separation.
-   Content-Type header also used inside a **MIME part** specifying the **type of this part**, popular Content-Type headers:
    -   text: which has several **sub-types** eg. text/plain for ASCII, text/html for html, text/enriched. can contain second parameter defining the character set used for encoding the text. eg. **charset=utf-8, charset=us-ascii, charset=iso-8859-1**.
    -   image
    -   audio
    -   video
    -   application: contains binary information produced by a particular application listed as the subtype. the client needs to lunch the application listed in the subtype to extract the binary information.
-   email clients use **the Simple Mail Transfer Protocol (SMTP)**.
-   **Mail eXchange (MX) records of the DNS** maps the SMTP servers addresses that contain a specific mailbox, where set of MX records can be associated with each domain.
-   Each MX record contains numerical preference and fully qualified domain name of SMTP server that is able to send mail to all valid email addresses of this domain.
-   The DNS can return several MX records for a given domain. In this case, the server with the **lowest preference** is used first. If this server is not reachable, the second most preferred server is used etc.
-   the receiver SMTP server will store the email message, and client can retrieve it using **web mail interface or protocols** such as **Post Office Protocol (POP) or the Internet Message Access Protocol (IMAP)**.

---

### The Simple Mail Transfer Protocol (SMTP)

-   client-server protocol.
-   5 types of processes involved in the delivery of email message.

    1. Mail User Agent (MUA): email client or web mail, sends the message to MSA.
    2. Mail Submission Agent (MSA): processes the email message and forwards it to MTA.
    3. Mail Transmission Agent (MTA): transmits the message directly -or via intermediate MTAs- to MTA of the destination domain. destination MTA forewords the MDA.
    4. Mail Delivery Agent (MDA): will store the message and make it available to the receiving MUA.
    5. receiver MUA.

-   SMTP is used for the interactions between MUA-MSA, MSA-MTA, and MTA-MTA.
-   SMTP is text-based protocol, relies on **byte-stream services**.
-   SMTP servers listen on port 25.
-   SMTP clients send commands that each is **ASCII text terminated by CR+FL**, SMTP servers respond with **3 digit number indicate success/error and optional comments**.
-   SMTP request BNF has 5 main commands: **EHLO, MAIL FROM:, RCPT TO:, DATA and QUIT**.
-   Postmaster is the alias of the system administrator who is responsible for a given domain or SMTP server. All domains must have a Postmaster alias.
-   SMTP servers use structured reply codes containing three digits and an optional comment. The first digit indicates success/error,
    -   2xy = command accepted.
    -   3xy = command accepted, but additional information from the client is expected.
    -   4xy = negative reply, try again later.
    -   5xy = permanent failure or error, don't try again.
    -   250 is the standard success response.
        ![SMTP response codes](https://imgur.com/TxdqA0Y.png)
-   The transfer of an email message is performed in three phases:
    1. client opens transport connection with server.
    2. client and server exchange greetings messages (EHLO command), if no proper greetings received, server would close the connection.
    3. email transfer phase: the client transfers one or more email messages by indicating the email address of the sender (MAIL FROM: command), the email address of the recipient (RCPT TO: command) followed by the headers and the body of the email message (DATA command). Once the client has finished sending all its queued email messages to the SMTP server,
       it terminates the SMTP association (QUIT command).

---

### The Post Office Protocol (POP)

-   Internet Message Access Protocol (IMAP): allow client applications to efficiently access in **real-time** to messages stored in various folders on servers, and provides the functions that are necessary to search, download, delete or filter messages.

-   POP allows a client to download all the messages destined to a given user from his/her email server.
-   POP is another example of a simple line-based protocol.
-   POP listens on port 110.
-   POP session is composed of 3 parts:

    1. authorization phase: server verifies client credentials
    2. transaction phase: client downloads messages.
    3. update phase: concludes the session.

-   POP client sends commands and the server replies are prefixed by +OK to indicate a successful command or by -ERR to indicate errors.
-   POP commands:
    -   USER, PASS: exchange username and password
    -   STAT: retrieve information about the status of the server, server replies with OK + number of messages in the mailbox + size of the mailbox in bytes
    -   RETR: retrieve number of messages (n) supplied in the command.
    -   DELE: delete a message with the position (n) supplied in the command.
    -   QUIT.

---

### HTTP protocol

-   **document sharing system** such as the world wide web is composed of 3 parts:

    1. standard addressing schema.
    2. standard document format: HTML.
    3. standard protocol: facilities efficient retrieve of documents stored ona server.

-   BNF of URI
    ![bnf of URI](https://imgur.com/7SKXKpX.png)

-   URI components:

    1. scheme: identifies the application-layer protocol that must be used by the client to retrieve the document, as **[scheme]://** eg. http, https, ws ...
    2. authority: identifies the DNS name or the IP address of the server. document will be retrieved from the server based on the scheme.
    3. path: **([A-Z0-9]\/)+**
    4. query: **?p1=any**: optional

-   The first version of HTML was derived from the Standard Generalized Markup Language (SGML) that was standardised in 1986 by ISO
-   A markup language is a structured way of adding annotations about the formatting of the document within the document itself. Example markup languages include troff, which is used to write the Unix man pages or Latex.
-   HTTP is a text-based protocol, in which the client sends a request and the server returns a response.
-   HTTP listens on port 80, runs above **byte-stream services**.
-   HTTP request contains 3 parts:

    1. method
    2. header
    3. optional MIME document

-   HTTP response contains:

    1. status line
    2. header
    3. MIME document

-   HTTP methods:

    -   GET: client must open **tcp connection on port 80** with the server to receive the response document.
    -   HEAD: similar to GET, but retrieves only the header of the response
    -   POST: send a document to the server, sent document attached to the request as MIME document.

-   HTTP Response headers:

    -   Content-Length: length of the MIME document in bytes
    -   Content-Type: type of the MIME document attached, html documents = text/html.
    -   Content-Encoding: encoding of the MIME document, eg. 'x-gzip'
    -   Server: version of the web server generated the response, may include **server software, optional modules they used**
    -   Date
    -   Last-Modified: indicates the last modification of the attached document.

-   HTTP request headers:

    -   User-Agent: information about the client generated the request.
    -   If-Modified-Since: enables clients to cache documents on their memory, so that the client will check the existence of this file in its cache before sending the request over the network.
    -   Referrer: contains URI of the document that the client visited before requesting this document,
    -   Host: contains fully qualified domain name of the URI being requested.

-   HTTP response status code:

    -   2xy: OK
    -   3xy: requested document is no longer available on the server, 301 = moved permanently, Location header with the new URI is sent with the response. 304 = not modified.
    -   4xy: bad request
    -   5xy: server error.

-   using TCP with http has multiple performance problems:

    -   open TCP connection for each URI, requires the client and server to exchange multiple open/close connection packets that are not necessary.
    -   increases the delay, where large number of client connections may be a bottleneck for the server.

-   the solution was to introduce support for **persistent TCP connections**: where a multiple http requests can be sent over a single TCP connection.
-   several new headers introduced to support **persistent TCP connections**:
    -   Connection: used with keep-alive argument by the client to indicate that the TCP connection needs to stay persistent.
    -   Keep-Alive: contains 2 parameters:
        1. maximum number of requests that server agrees to serve through this TCP connection.
        2. timeout (in seconds) after which the server will close **an idle the connection**.

## references

-   [b] Bonaventure, O. (2011). Computer networking: Principles, protocols and practice. The Saylor Foundation. This book is licensed under Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0).
