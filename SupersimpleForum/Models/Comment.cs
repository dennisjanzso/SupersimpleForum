namespace SupersimpleForum.Models
{
    public class Comment
    {
        public int comment_id { get; set; }
        
        public string author { get; set; }
        
        public string text { get; set; }
        
        public int parent_id { get; set; }
        
        public int subComment { get; set; }
    }
}