using System;

namespace DatingApp_API.Models
{
    public class Message
    {
        public int ID { get; set; }
        public int SenderID { get; set; }
        public User Sender { get; set; }
        public int RecipientID { get; set; }
        public User Recipient { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
    }
}