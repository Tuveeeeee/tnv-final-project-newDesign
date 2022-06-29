using movieApp.Core.BL.Service;
using movieApp.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace movieApp.Core.BL
{
    public class ApplicationManager
    {
        private IStorageService _storageService;

        public ApplicationManager(IStorageService storageService)
        {
            _storageService = storageService;
        }

        public List<Comments> GetAllComments() => _storageService.GetAllComments();

        public bool DeleteCommentById(int commentId)
        {
            return _storageService.DeleteCommentById(commentId);
        }

        public Comments UpdateCommentById(int commentId, string comment)
        {
            return _storageService.UpdateCommentById(commentId, comment);
        }

        public Comments CreateComment(int user_Id, int movie_Id, string comment)
        {
            if (comment.Length < Comments.MIN_COMMENTS)
            {
                throw new Exception($"Il commento deve avere un minimo di {Comments.MIN_COMMENTS} caratteri");
            }

            return _storageService.CreateComment(user_Id, movie_Id, comment);
        }
    }
}
