const amqp = require("amqplib")

const sendNotification= async (headers,message)=>{
    try{
        const connection=await amqp.connect("amqp://localhost")
        const channel=await connection.createChannel()

        const exchange="header_exchange"
        const exchangeType="headers"

        await channel.assertExchange(exchange,exchangeType,{durable:true})

        channel.publish(exchange,"",Buffer.from(message),{
            persistent:true,
            headers
        });
        console.log("sent notification with headers");

        setTimeout(()=>{
     connection.close();
        },500)
    }catch(err){
        console.error(err)
    }
}

sendNotification({"x-match":"all","notification-type":"new_video","content-type":"video"},"New music video uploaded");
sendNotification({"x-match":"all","notification-type":"live-stream","content-type":"gaming"},"GAMING video uploaded");
sendNotification({"x-match":"any","notification-type-comment":"comment","content-type":"vlog"},"New Comment on your video");
sendNotification({"x-match":"any","notification-type-like":"like","content-type":"vlog"},"New like video uploaded");
