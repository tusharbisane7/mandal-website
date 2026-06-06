function MessageBubble({
  text,
  mine,
  time,
  status,
}) {

  return (

    <div
      className={
        mine
          ? "my-message"
          : "other-message"
      }
    >

      <p>{text}</p>

      <small>

        {time}

        {mine &&
          status === "sent" &&
          " ✓"}

        {mine &&
          status === "delivered" &&
          " ✓✓"}

        {mine &&
          status === "seen" &&
          " 🔵✓✓"}

      </small>

    </div>

  );

}

export default MessageBubble;