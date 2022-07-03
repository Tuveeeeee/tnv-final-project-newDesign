using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace movieApp.Core.Model
{
    public class Comments
    {
        public const int MIN_COMMENTS = 50;

        public int Id { get; set; }
        public int User_Id { get; set; }
        public int Movie_Id { get; set; }
        public string Comment { get; set; }

        public Comments(int id, int user_Id, int movie_Id, string comment)
        {
            Id = id;
            User_Id = user_Id;
            Movie_Id = movie_Id;
            Comment = comment;
        }

        public Comments()
        {
        }
    }
}