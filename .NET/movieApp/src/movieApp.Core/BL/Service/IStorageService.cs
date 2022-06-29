using movieApp.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace movieApp.Core.BL.Service
{
    public interface IStorageService
    {
        Comments CreateComment(int user_Id, int movie_Id, string comment);
        List<Comments> GetAllComments();
        Comments GetCommentById(int commentId);
        bool DeleteCommentById(int commentId);
        Comments UpdateCommentById(int commentId, string comment);

    }
}
