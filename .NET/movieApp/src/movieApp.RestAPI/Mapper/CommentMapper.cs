using movieApp.Core.Model;

namespace movieApp.RestAPI.Mapper
{
    public class CommentMapper
    {
        public static CommentContract From(Comments comment)
        {
            return new()
            {
                Id = comment.Id,
                Movie_Id = comment.Movie_Id,
                User_Id = comment.User_Id,
                Comment = comment.Comment
            };
        }
    }
}
