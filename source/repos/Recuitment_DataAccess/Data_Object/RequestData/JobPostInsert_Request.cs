using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Recuitment_DataAccess.Data_Object.RequestData
{
    public class JobPostInsert_Request
    {
        public int Post_ID { get; set; }
        public int Employer_ID { get; set; }

        public int Company_ID { get; set; }

        public string? Job_Title { get; set; }

        public string? Job_Description { get; set; }
        public string? Job_Requirements { get; set; }
        public int Salary_min { get; set; }
        public int Salary_max { get; set; }

        public DateTime Created_at { get; set; }

        public int Contact_type_id { get; set; }
        public int Job_Position_ID { get; set; }
        public int Job_Type_ID { get; set; }
        public int Job_Category_ID { get; set; }
        public int Job_Location_ID { get; set; }
        public int CV_Language_ID { get; set; }
    }
}
