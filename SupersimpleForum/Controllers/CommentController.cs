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
    public class CommentController : ControllerBase
    {
        private static string _connStr = @"
              Server=127.0.0.1,1433;
              Database=Master;
              User Id=SA;
              Password=increoNETapp2020
           ";
        
        // GET by post
        [HttpGet("{parent_id}/{sub}")]
        public List<Dictionary<string, string>> get(string parent_id, string sub)
        {
            DataTable table = new DataTable();

            string query = "select * from comments where parent_id = @pid and is_subComment = @sub";

            var con = new SqlConnection(_connStr);
            var cmd = new SqlCommand(query, con);
            cmd.Parameters.AddWithValue("@pid", parent_id);
            cmd.Parameters.AddWithValue("@sub", sub);
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
        public string post([FromBody] Comment comment)
        {
            try
            {
                DataTable table = new DataTable();

                string query = "insert into comments values (@author, @text, @parent_id, @is_subComment)";

                var con = new SqlConnection(_connStr);
                var cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@author", comment.author);
                cmd.Parameters.AddWithValue("@text", comment.text);
                cmd.Parameters.AddWithValue("@parent_id", comment.parent_id);
                cmd.Parameters.AddWithValue("@is_subComment", comment.subComment);
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Comment published successfully";
            }
            catch (Exception e)
            {
                return "An error occurred in publishing comment: " + e;
            }
        }
    }
    
    
}