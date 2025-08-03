const amqp=require('amqplib')

const recieveMessage=async()=>{
    try{
    const connection=await amqp.connect("amqp://localhost")
    const channel=await connection.createChannel()
    const exhange="notification_exchange"
    const queue="order_queue"

    await channel.assertExchange(exhange,"topic",{durable:true})
    await channel.assertQueue(queue,{durable:true})


    await channel.bindQueue(queue,exhange,"order.*")

    console.log("waiting for messages")
     channel.consume(
        queue,
        (msg)=>{
            if(msg!=null){
                console.log(`[order notification] msg was consumed routing key ${queue}`)
                channel.ack(msg)
            }
        },
        {noAck:false}
     )

    }
    catch(err){
        console.log(err);
    }
}
recieveMessage()