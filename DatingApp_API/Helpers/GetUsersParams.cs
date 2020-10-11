namespace DatingApp_API.Helpers
{
    public class GetUsersParams
    {
        public int CurrentPage { get; set; } = 1;
        private int _totalItems = 50;
        public int MaxItemsPerPage = 50;
        public int ItemsPerPage
        {
            get { return _totalItems; }
            set { _totalItems = value > MaxItemsPerPage ? MaxItemsPerPage : value; }
        }
        public int UserID { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 200;
    }
}