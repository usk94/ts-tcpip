import * as dgram from "dgram"

const socket = dgram.createSocket("udp4")

const frame = Buffer.alloc(42)
frame.writeUInt16BE(1, 0) // Hardware type: Ethernet
frame.writeUInt16BE(0x0800, 2) // Protocol type: IPv4
frame.writeUInt8(6, 4) // Hardware size
frame.writeUInt8(4, 5) // Protocol size
frame.writeUInt16BE(1, 6) // Opcode: request
frame.write("your_mac_address", 8, 6) // Sender MAC address
frame.write("your_ip_address", 14, 4) // Sender IP address
frame.write("target_mac_address", 18, 6) // Target MAC address
frame.write("target_ip_address", 24, 4) // Target IP address

const targetMac = "target_mac_address"

socket.send(frame, 0, frame.length, 0, targetMac, (err) => {
  if (err) throw err
  console.log("ARP packet sent!")
})
