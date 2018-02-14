using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class SRStudentEditViewModel
    {
        public int RecordID { get; set; }
        public string StudentID { get; set; }
        public string MatricNo { get; set; }
        public string JambRegNo { get; set; }
        public int SchoolID { get; set; }
        public Nullable<int> CustomerID { get; set; }
        public Nullable<int> ProgramType { get; set; }
        public Nullable<int> StudentType { get; set; }
        public string StudentCategory { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Nationality { get; set; }
        public string StateCode { get; set; }
        public string LGAID { get; set; }
        public Nullable<int> Gender { get; set; }
        //public int StatusID { get; set; }
        public Nullable<int> AbilityStatus { get; set; }
        public string NationalID { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string MobilePhone { get; set; }
        public Nullable<int> EntryMode { get; set; }
        public Nullable<int> PictureID { get; set; }
        public Nullable<System.DateTime> AdmissionDate { get; set; }
        public Nullable<System.DateTime> DOB { get; set; }
        public string EntryLevel { get; set; }
        public string CurrentLevel { get; set; }
        public string MajorCourse { get; set; }
        public string Arm { get; set; }
        public Nullable<float> CGPA { get; set; }
        public Nullable<int> AdvisorID { get; set; }
        public decimal OpeningBalance { get; set; }
        public decimal AmountDueToDate { get; set; }
        public decimal AmountPaidToDate { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> ScholarshipStatus { get; set; }
        public string ScholarshipID { get; set; }
        public Nullable<System.DateTime> StatusDate { get; set; }
        public Nullable<int> FacultyID { get; set; }
        public Nullable<int> DepartmentID { get; set; }
        public string PayTemplateNo { get; set; }
        public Nullable<int> ParentID { get; set; }
        public Nullable<System.DateTime> AuditDateTime { get; set; }
        public string AuditUserID { get; set; }
    }
}