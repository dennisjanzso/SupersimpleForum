using System;

namespace SupersimpleForum.Models
{
    public class Post
    {
        public int post_id { get; set; }
        
        public string author { get; set; }
        
        public string text { get; set; }
        
        public string title { get; set; }
        
        public string action { get; set; }
    }

}