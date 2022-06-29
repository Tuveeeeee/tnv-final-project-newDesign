namespace movieApp.RestAPI.Mapper
{
    public class CommentContract
    {
        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Movie_Id { get; set; }
        public string Comment { get; set; }
    }
}
