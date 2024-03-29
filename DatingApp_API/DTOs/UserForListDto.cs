using System;

namespace DatingApp_API.DTOs
{
    public class UserForListDto
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string PhotoUrl { get; set; }
    }
}