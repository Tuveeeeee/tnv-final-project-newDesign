using movieApp.Core.Model;
using movieApp.Ef.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace movieApp.Ef.Mapper
{
    public class CommentMapper
    {
        public static Comments From(CommentsEntity commentoEntity)
        {
            return new()
            {
                Id = commentoEntity.Id,
                User_Id = commentoEntity.User_Id,
                Movie_Id = commentoEntity.Movie_Id,
                Comment = commentoEntity.Comment
            };
        }
    }
}
