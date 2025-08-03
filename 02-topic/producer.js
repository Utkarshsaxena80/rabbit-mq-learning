const amqp=require('amqplib')

const sendMessage=async(routingKey,message)=>{
    try{
        const connection=await amqp.connect("amqp://localhost")
        const channel=await connection.createChannel();
        const exhange="notification_exchange"
        const exchangeType="topic"

        await channel.assertExchange(exhange,exchangeType,{durable:true})

        channel.publish(exhange,routingKey,Buffer.from(JSON.stringify(message)),{persistent:true})
        console.log("[x] sent '%s' :'%s' ",routingKey,JSON.stringify(message));
        console.log(`message wass sent to routing key ${routingKey}`)

        setTimeout(()=>{
            connection.close();
        },500)
    }
    catch(err){
        console.log(err);
    }

    // sendMessage("payment.processed",{paymentId:67890,status:"processed"})
}
sendMessage("order.placed",{orderId:12345,status:"placed"})