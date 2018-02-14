using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class StudentSummary
    {
        public int RecordID { get; set; }
        public Nullable<int> DepartmentID { get; set; }
        public string StudentID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string EmailAddress { get; set; }
        public string MobilePhone { get; set; }
        public string MatricNo { get; set; }
        public string JambRegNo { get; set; }
        public Nullable<int> ProgramType { get; set; }
        public Nullable<int> StudentType { get; set; }
        public string PayTemplateNo { get; set; }
        public Nullable<int> ParentID { get; set; }
    }
}