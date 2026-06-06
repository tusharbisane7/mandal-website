import Chat from "../models/Chat.js";

export const getMessages =
async (req,res)=>{

 try{

  const {
   senderId,
   receiverId
  } = req.params;

  const chats =
  await Chat.findAll({

   order:[
    ["createdAt","ASC"]
   ]

  });

  const filtered =
  chats.filter(chat=>

   (

    chat.senderId ==
    senderId &&

    chat.receiverId ==
    receiverId

   )

   ||

   (

    chat.senderId ==
    receiverId &&

    chat.receiverId ==
    senderId

   )

  );

  res.json(filtered);

 }catch(error){

  console.log(error);

  res.status(500).json({
   message:"Server Error"
  });

 }

};