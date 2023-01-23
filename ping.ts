import * as net from "net"

const icmpPacket = Buffer.alloc(64)
icmpPacket.writeUInt8(8, 0) // Type
icmpPacket.writeUInt8(0, 1) // Code
icmpPacket.writeUInt16BE(0, 2) // Checksum
icmpPacket.writeUInt16BE(0, 4) // Identifier
icmpPacket.writeUInt16BE(0, 6)

const socket = net.createConnection(1, "8.8.8.8", () => {
  console.log("成功した？")
})

const hoge = socket.write(icmpPacket)
console.log("here", hoge)
