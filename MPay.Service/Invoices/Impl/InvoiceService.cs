using MPay.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MPay.Domain;
using MPay.Service.Models;
using System.Transactions;
using OfficeOnline.DataBlock;
using OfficeOnline;

namespace MPay.Service
{
    public class InvoiceService:EfRepository<MPayEntities, SRInvoiceHeader>,IInvoiceService
    {
        public void ProcessInvoice(int sessionId, int subSessionId, int scheduleId, string selectedStudent)
        {
            SRSession session = _entities.SRSessions.FirstOrDefault(x=>x.RecordID==sessionId);
            SRSessionsDTL term = _entities.SRSessionsDTLs.FirstOrDefault(x => x.RecordID == subSessionId);
            SRFeeScheduleHdr schedule = _entities.SRFeeScheduleHdrs.FirstOrDefault(x => x.RecordID == scheduleId);
                //_entities.SRStudents.FirstOrDefault(x => x.RecordID == studentId);
            var ScheduleDtl = _entities.SRFeeScheduleDTLs.Where(x => x.ParentID == scheduleId).ToList();

            TransactionOptions options = new TransactionOptions();
            options.Timeout = TimeSpan.FromMinutes(2);
            options.IsolationLevel = IsolationLevel.ReadCommitted;
            using (TransactionScope save = new TransactionScope(TransactionScopeOption.Required, options))
            {           
                    int batchno = 0;
                    int studentCount = 0;
                  
                    TableSerialNo nNumber = new TableSerialNo();

                    //        // TODO: Add insert logic here
                    string thisBatch = nNumber.GetNextNumberString("DEFAULT", "DEFAULT", "CB#", ref batchno);
                    foreach (var studid in selectedStudent.Split(new Char[] { ',' }))
                    {
                      SRInvoiceHeader srinvoiceheader = new SRInvoiceHeader();
                  
                    int studentId = Convert.ToInt32(studid);
                        SRStudent srstudent = _entities.SRStudents.FirstOrDefault(x => x.RecordID == studentId);
                        //            // CreateInvoice(FoCommon.AuditCompanyID, FoCommon.AuditDivisionID, FoCommon.AuditDepartmentID, _schoolSessionID, _term_SemesterID, srstudent.StudentID, _feeScheduleID, srstudent.StudentCategoryID, DateTime.Now, 1, FoCommon.AuditCompanyID, (String)Session["AuditUserID"], "","","SIB000000031","");

                        #region Process Invoice Header/Detail
                        if (srstudent != null)
                        {
                        //This checks if the invoice already exists for this term for specified student
                        var exist = _entities.SRInvoiceHeaders.FirstOrDefault(x => x.SessionID == session.RecordID && x.TermID == term.RecordID
                                                                                     && x.StudentID == studid);
                        if (exist == null) { 
                        #region  Process Invoice Header            
                        int nxtnum = 0;
                            srinvoiceheader.DivisionID = "DEFAULT";
                            srinvoiceheader.DepartmentID = "DEFAULT";

                            // nNumber.DatabaseTransaction
                            srinvoiceheader.BatchID = thisBatch;
                            srinvoiceheader.InvoiceNumber = nNumber.GetNextNumberString("DEFAULT", "DEFAULT", "INV", ref nxtnum);
                            srinvoiceheader.InvoiceNumberRef = srinvoiceheader.InvoiceNumber;
                            srinvoiceheader.TransactionTypeID = "INV";
                            srinvoiceheader.StudentID = Convert.ToString(studentId);   
                            srinvoiceheader.SessionID = session.RecordID;             
                            srinvoiceheader.TermID = term.RecordID;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                            srinvoiceheader.ClassID = srstudent.CurrentLevel;
                            srinvoiceheader.ArmID = srstudent.Arm;
                            srinvoiceheader.ScheduleID = schedule.ScheduleID;
                            srinvoiceheader.TransOpen = true;
                            srinvoiceheader.InvoiceDate = DateTime.Now;
                            srinvoiceheader.InvoiceDueDate = DateTime.Now.AddMonths(1);
                            srinvoiceheader.CurrencyID = "NGN";
                            srinvoiceheader.CurrencyExchangeRate = 1;
                            srinvoiceheader.Printed = false;
                            srinvoiceheader.AuditCompanyID = "DEFAULT";
                            srinvoiceheader.AuditUserID = "";
                            srinvoiceheader.AuditDatetime = DateTime.Now;
                            //srinvoiceheader.SRInvoiceDetails = null;
                            _entities.SRInvoiceHeaders.Add(srinvoiceheader);
                            _entities.SaveChanges();

                            #endregion
                        //Invoice Detaials Processing
                        int itemCount = 0;
                        int scheduleCount = ScheduleDtl.Count;
                        SRInvoiceDetail srinvoicedetail = new SRInvoiceDetail();
                            #region Invoice Detail Process                           
                            foreach (var sch_itemid in ScheduleDtl)
                        {
                            //string studentid = studid;
                            string itemid = sch_itemid.ItemID;
                            decimal unitamount = (decimal)sch_itemid.FeeAmount;
                            srinvoicedetail.CompanyID = "DEFAULT";
                            srinvoicedetail.DivisionID = "DEFAULT";
                            srinvoicedetail.DepartmentID = "DEFAULT";
                            srinvoicedetail.ParentID = srinvoiceheader.RecordID;
                            srinvoicedetail.LineNumber = FoCommon.NextSequenceInt();
                            srinvoicedetail.ItemID = sch_itemid.ItemID;
                            srinvoicedetail.GLTransAccount = sch_itemid.LedgerAccount;
                            srinvoicedetail.CurrencyID = "NGN";
                            srinvoicedetail.ItemQty = 1;
                            srinvoicedetail.ItemUnitPrice = (decimal)sch_itemid.FeeAmount;
                            srinvoicedetail.Total = (decimal)sch_itemid.FeeAmount;
                            srinvoicedetail.AuditCompanyID = "DEFAULT";
                            srinvoicedetail.AuditUserID = "";
                            srinvoicedetail.AuditDatetime = DateTime.Now;
                            _entities.SRInvoiceDetails.Add(srinvoicedetail);
                            itemCount++;
                            //if (itemCount % scheduleCount == 0)
                            //{
                                _entities.SaveChanges();
                                //wuo.Save();
                            //}
                            //Necessary since we can't specify the total amount at the first point of inserting it
                                updateHeaderAmountTotal(srinvoiceheader.InvoiceNumber);
                        }
                            #endregion

                        }
                        //Put the headerUpdate here
                    }
                    #endregion

                         studentCount++;
                    }
                  save.Complete();
            }
        }

        public bool updateHeaderAmountTotal(string invoicenumber)
        {
            var invhdr = _entities.SRInvoiceHeaders.FirstOrDefault(sc => sc.InvoiceNumber == invoicenumber);
            invhdr.SubTotal = _entities.SRInvoiceDetails.Where(x => x.CompanyID == "DEFAULT" && 
                                x.SRInvoiceHeader.InvoiceNumber ==invoicenumber).Sum(c => c.Total);
            invhdr.Total = _entities.SRInvoiceDetails.Where(x => x.CompanyID == "DEFAULT" && 
                                                x.SRInvoiceHeader.InvoiceNumber==invoicenumber).Sum(c => c.Total);
            _entities.SaveChanges();
            return true;
        }
    }
}
