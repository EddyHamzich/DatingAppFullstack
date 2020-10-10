namespace DatingApp_API.Helpers
{
    public class GetMessagesParams
    {
        public int PageNumber { get; set; } = 1;
        public int MaxPageSize = 50;
        private int _pageSize = 50;
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = value > MaxPageSize ? MaxPageSize : value; }
        }
        public int UserID { get; set; }
        public string MessageContainer { get; set; } = "Unread";
    }
}