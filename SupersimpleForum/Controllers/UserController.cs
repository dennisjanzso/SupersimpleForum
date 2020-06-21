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
using System.Text;

namespace SupersimpleForum.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        
        private static string _connStr = @"
              Server=127.0.0.1,1433;
              Database=Master;
              User Id=SA;
              Password=increoNETapp2020
           ";

        [HttpPost]
        public Tuple<Boolean, string> post([FromBody] User user)
        {

            Tuple<Boolean, string> response = Tuple.Create(false, "");
            
            if (user.action == "LOGIN")
            {
                response = login(user);
            }
            else if (user.action == "CREATE_USER")
            {
                response = create_user(user);
            }

            return response;
        }

        private Tuple<Boolean, string> login(User user)
        {
            try
            {
                DataTable table = new DataTable();

                string query = "select * from users where username = @uname";

                var con = new SqlConnection(_connStr);
                var cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@uname", user.username);
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                byte[] salt = Encoding.UTF8.GetBytes(table.Rows[0]["salt"].ToString());
                string hashedPass = PasswordHasher.Hash(user.password, salt);

                if (table.Rows[0]["password"].ToString() == hashedPass)
                {
                    return Tuple.Create(true, "");
                }
                return Tuple.Create(false, "Incorrect username or password");
                
            }
            catch (Exception e)
            {
                return Tuple.Create(false, "Incorrect username or password");
            }
        }

        private Tuple<Boolean, string> create_user(User user)
        {
            try
            {
                string salt = PasswordHasher.GenSalt();
                byte[] saltBytes = Encoding.UTF8.GetBytes(salt);
                string hashedPass = PasswordHasher.Hash(user.password, saltBytes);

                DataTable table = new DataTable();

                string query = "insert into users values (@username, @password, @salt)";

                var con = new SqlConnection(_connStr);
                var cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@username", user.username);
                cmd.Parameters.AddWithValue("@password", hashedPass);
                cmd.Parameters.AddWithValue("@salt", salt);
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return Tuple.Create(true, "");
            }
            catch (Exception e)
            {
                if (e.HResult.ToString() == "-2146232060")
                {
                    return Tuple.Create(false, "Username already taken");
                }
                return Tuple.Create(false, "Unknown error occurred");
            }
        }
    }
}