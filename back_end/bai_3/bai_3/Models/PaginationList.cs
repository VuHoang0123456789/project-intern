namespace bai_3.Models
{
    public class PaginationList
    {
        public int _totalPage { get; }
        public int _pageNumber { get; }
        public List<Student> _paginationList { get; }
        public PaginationList(int TotalPage = 0, int PageNumber = 0, List<Student> PaginationLists = null)
        {
            _totalPage = TotalPage;
            _pageNumber = PageNumber;
            _paginationList = PaginationLists;
        }
    }
}
