using Microsoft.AspNetCore.Mvc;
using movieApp.Core.BL;
using movieApp.Core.BL.Service;
using movieApp.Core.Model;
using movieApp.RestAPI.Mapper;
using movieApp.RestAPI.Model;
using Microsoft.AspNetCore.Cors;

namespace movieApp.RestAPI.Controllers
{
    [ApiController]
    [Route("api/comments")]
    public class CommentsController : ControllerBase
    {
        ApplicationManager _applicationManager;

        public CommentsController(IStorageService storageService)
        {
            _applicationManager = new ApplicationManager(storageService);
        }

        [EnableCors("Policy1")]
        [HttpGet]
        public ActionResult<List<CommentContract>> GetAllComments()
        {
            var comments = _applicationManager
                .GetAllComments()
                .Select(c => CommentMapper.From(c));
            return Ok(comments);
        }

        [EnableCors("Policy1")]
        [HttpGet]
        [Route("{comment-id}")]
        public ActionResult<CommentContract> GetCommentById([FromRoute(Name = "comment-id")] int commentId)
        {
            try
            {

                var comment = _applicationManager.GetAllComments().First(c => c.Id == commentId);
                return Ok(CommentMapper.From(comment));
            }
            catch (Exception ex)
            {
                var errorMessage = new ErrorResponse()
                {
                    Message = $"Non esiste un commento con id {commentId}"
                };
                return NotFound(errorMessage);
            }
        }

        [EnableCors("Policy1")]
        [HttpDelete]
        [Route("{comment-id}")]
        public ActionResult<CommentContract> DeleteCommentById([FromRoute(Name = "comment-id")] int commentId)
        {
            try
            {
                var comment = _applicationManager.GetAllComments().First(c => c.Id == commentId);
                var commentDeleted = _applicationManager.DeleteCommentById(commentId);

                return Ok(CommentMapper.From(comment));
            }
            catch (Exception ex)
            {
                var errorMessage = new ErrorResponse()
                {
                    Message = $"Non esiste un commento con id {commentId}"
                };
                return NotFound(errorMessage);
            }
        }

        [EnableCors("Policy1")]
        [HttpPatch]
        [Route("{comment-id}")]
        public ActionResult<CommentContract> UpdateCommentById(
            [FromRoute(Name = "comment-id")] int commentId,
            [FromBody] UpdateCommentContract commentUpdateInfo)
        {
            try
            {
                var updatedComment = _applicationManager.UpdateCommentById(commentId, commentUpdateInfo.Comment);
                return Ok(CommentMapper.From(updatedComment));
            }
            catch (Exception ex)
            {
                var errorMessage = new ErrorResponse()
                {
                    Message = $"Non esiste un commento con id {commentId}"
                };
                return NotFound(errorMessage);
            }
        }

        //metodo per la creazione di una recensione 
        [EnableCors("Policy1")]
        [HttpPost]
        public ActionResult<CommentContract> CreateNewComment([FromBody] Comments newComment)
        {
            try
            {
                var CommentToCreate = _applicationManager.CreateComment(newComment.User_Id, newComment.Movie_Id, newComment.Comment);

                return Ok(CommentMapper.From(CommentToCreate));
            }
            catch (Exception ex)
            {
                var errorMessage = new ErrorResponse()
                {
                    Message = $"Il commento deve contenere almeno {Comments.MIN_COMMENTS} caratteri"
                };
                return NotFound(errorMessage);
            }

        }
    }
}
