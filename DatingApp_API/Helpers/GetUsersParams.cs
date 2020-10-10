namespace DatingApp_API.Helpers
{
    public class GetUsersParams
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
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 200;
    }
}