import { useState } from "react";

import ChatsTab from "./components/ChatsTab";
import GroupsTab from "./components/GroupsTab";
import ChatRoom from "./components/ChatRoom";

import "./Chat.scss";

function Chat(){

 const [
  activeTab,
  setActiveTab
 ] = useState("chats");

 const [
  selectedUser,
  setSelectedUser
 ] = useState(null);

 const [
  selectedGroup,
  setSelectedGroup
 ] = useState(null);

 return(

  <div className="chat-container">

   {
    !selectedUser &&
    !selectedGroup
    &&

    <>

     <div className="tabs">

      <button
       className={
        activeTab ===
        "chats"
         ? "active"
         : ""
       }
       onClick={()=>
        setActiveTab(
         "chats"
        )
       }
      >
       Chats
      </button>

      <button
       className={
        activeTab ===
        "groups"
         ? "active"
         : ""
       }
       onClick={()=>
        setActiveTab(
         "groups"
        )
       }
      >
       Groups
      </button>

     </div>

     {
      activeTab ===
      "chats"

      ?

      <ChatsTab
       setSelectedUser={
        setSelectedUser
       }
      />

      :

      <GroupsTab
       setSelectedGroup={
        setSelectedGroup
       }
      />

     }

    </>

   }

   {
    selectedUser &&

    <ChatRoom

     user={
      selectedUser
     }

     goBack={
      ()=>setSelectedUser(
       null
      )
     }

    />
   }

  </div>

 );

}

export default Chat;