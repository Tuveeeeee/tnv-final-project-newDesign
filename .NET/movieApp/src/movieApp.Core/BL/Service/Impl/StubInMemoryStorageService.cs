using movieApp.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace movieApp.Core.BL.Service.Impl
{
    public class StubInMemoryStorageService : IStorageService
    {
        private List<Comments> _comment;

        public StubInMemoryStorageService()
        {
            _comment = new();
            InitStubComment(10);
        }

        public Comments CreateComment(int user_Id, int movie_Id, string comment)
        {
            int commentId = GetNextCommentId();
            Comments commentToCreate = new Comments(commentId, user_Id, movie_Id, comment);
            _comment.Add(commentToCreate);
            return commentToCreate;
        }

        public bool DeleteCommentById(int commentId)
        {
            Comments comment = GetCommentById(commentId);
            return _comment.Remove(comment);
        }

        public List<Comments> GetAllComments() => _comment;

        public Comments UpdateCommentById(int commentId, string comment)
        {
            Comments commentToUpdate = GetCommentById(commentId);
            if (commentToUpdate != null)
            {
                commentToUpdate.Comment = comment;
            }
            return commentToUpdate;
        }
        private int GetNextCommentId()
        {
            int id = 0;
            foreach (var comment in _comment)
            {
                if (comment.Id > id)
                {
                    id = comment.Id;
                }
            }
            return id + 1;
        }
        public Comments GetCommentById(int commentId)
        {
            Comments comment = null;
            foreach (var c in _comment)
            {
                if (c.Id == commentId)
                {
                    comment = c;
                    break;
                }
            }
            if (comment == null)
            {
                throw new Exception($"Non é stato trovato nessun commento con id {commentId}");
            }
            return comment;
        }


        private void InitStubComment(int stubSize)
        {
            for (int i = 0; i < stubSize; i++)
            {
                Comments c = new(GetNextCommentId(), i + 1, i + 1, $"L'utente con id {i + 1} ha commentato il film con id {i + 1}");
                _comment.Add(c);
            }
        }
    }
}
