using System;
using System.Collections.Generic;
using System.Text;

namespace Perfum.Domain.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime ReviewDate{ get; set; }

    }
}
