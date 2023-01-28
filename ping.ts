import * as dgram from "dgram"

const icmpPacket = Buffer.alloc(69)
icmpPacket.writeUInt8(8, 0) // Type
icmpPacket.writeUInt8(0, 1) // Code
icmpPacket.writeUInt16BE(0, 2) // Checksum
icmpPacket.writeUInt16BE(0, 4) // Identifier
icmpPacket.writeUInt16BE(0, 6)

const socket = dgram.createSocket("udp4")
const message = Buffer.from("ping")
let n = 0
const loopCount = 5

while (n < loopCount) {
  const reply = socket.send(
    message,
    10,
    message.length,
    1,
    "10.14.69.10",
    (error) => {
      if (error) throw error
    }
  )
  n++
}

socket.on("message", (msg, rinfo) => {
  console.log(`message: ${msg}`)
  console.log(`rinfo: ${rinfo}`)
})
