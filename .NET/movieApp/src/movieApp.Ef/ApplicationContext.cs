using Microsoft.EntityFrameworkCore;
using movieApp.Ef.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace movieApp.Ef
{
    public class ApplicationContext : DbContext
    {
        public DbSet<CommentsEntity> Comments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            var connectionString = "Server=localhost;Port=3306;Database=movie_app;Uid=root;Pwd=";
            var mySqlServerVersion = new MySqlServerVersion(new Version(10, 4, 24));

            optionBuilder.UseMySql(connectionString, mySqlServerVersion);

            base.OnConfiguring(optionBuilder);
        }
    }
}
