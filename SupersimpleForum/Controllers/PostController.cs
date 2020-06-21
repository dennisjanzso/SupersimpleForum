using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SupersimpleForum.Models;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;

namespace SupersimpleForum.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        
        private static string _connStr = @"
              Server=127.0.0.1,1433;
              Database=Master;
              User Id=SA;
              Password=increoNETapp2020
           ";
        
        // GET
        [HttpGet]
        public List<Dictionary<string, string>> get()
        {
            DataTable table = new DataTable();

            string query = "select * from posts";

            var con = new SqlConnection(_connStr);
            var cmd = new SqlCommand(query, con);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            
            var dict = table.AsEnumerable().Select(
                row => table.Columns.Cast<DataColumn>().ToDictionary(
                    column => column.ColumnName,
                    column => row[column].ToString()
                )).ToList();
            
            return dict;
        }
        
        // GET single post
        [HttpGet("{post_id}")]
        public List<Dictionary<string, string>> get(string post_id)
        {
            DataTable table = new DataTable();

            string query = "select * from posts where post_id = @pid";

            var con = new SqlConnection(_connStr);
            var cmd = new SqlCommand(query, con);
            cmd.Parameters.AddWithValue("@pid", post_id);
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            
            var dict = table.AsEnumerable().Select(
                row => table.Columns.Cast<DataColumn>().ToDictionary(
                    column => column.ColumnName,
                    column => row[column].ToString()
                )).ToList();
            
            return dict;
        }

        [HttpPost]
        public string post([FromBody] Post post)
        {
            string response = "";
            if (post.action == "PUBLISH")
            {
                response = publishPost(post);
            } else if (post.action == "DELETE")
            {
                response = deletePost(post);
            }

            return response;
        }

        public string publishPost(Post post)
        {
            try
            {
                DataTable table = new DataTable();

                string query = "insert into posts values (@title, @text, @author)";

                var con = new SqlConnection(_connStr);
                var cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@title", post.title);
                cmd.Parameters.AddWithValue("@text", post.text);
                cmd.Parameters.AddWithValue("@author", post.author);
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Post published successfully";
            }
            catch (Exception e)
            {
                return "An error occurred in publishing post: " + e;
            }
        }
        
        public string deletePost(Post post)
        {
            try
            {
                DataTable table = new DataTable();

                string query = "delete from posts where post_id = @pid";

                var con = new SqlConnection(_connStr);
                var cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@pid", post.post_id);
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Post deleted successfully";
            }
            catch (Exception e)
            {
                return "An error occurred in deleting post";
            }
        }
    }
}