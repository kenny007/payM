﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;

namespace MPay.Helpers
{
    public class PaymentHelperMethods
    {
            public static string getResponseDescription(string vResponseCode)
            {
                string result = "Unknown";
                if (vResponseCode.Length > 0)
                {
                    switch (vResponseCode)
                    {
                        case "0": result = "Transaction Successful"; break;
                        case "1": result = "Transaction Declined"; break;
                        case "2": result = "Bank Declined Transaction"; break;
                        case "3": result = "No Reply from Bank"; break;
                        case "4": result = "Expired Card"; break;
                        case "5": result = "Insufficient Funds"; break;
                        case "6": result = "Error Communicating with Bank"; break;
                        case "7": result = "Payment Server detected an error"; break;
                        case "8": result = "Transaction Type Not Supported"; break;
                        case "9": result = "Bank declined transaction (Do not contact Bank)"; break;
                        case "A": result = "Transaction Aborted"; break;
                        case "B": result = "Transaction Declined - Contact the Bank"; break;
                        case "C": result = "Transaction Cancelled"; break;
                        case "D": result = "Deferred transaction has been received and is awaiting processing"; break;
                        case "F": result = "3-D Secure Authentication failed"; break;
                        case "I": result = "Card Security Code verification failed"; break;
                        case "L": result = "Shopping Transaction Locked (Please try the transaction again later)"; break;
                        case "N": result = "Cardholder is not enrolled in Authentication scheme"; break;
                        case "P": result = "Transaction has been received by the Payment Adaptor and is being processed"; break;
                        case "R": result = "Transaction was not processed - Reached limit of retry attempts allowed"; break;
                        case "S": result = "Duplicate SessionID"; break;
                        case "T": result = "Address Verification Failed"; break;
                        case "U": result = "Card Security Code Failed"; break;
                        case "V": result = "Address Verification and Card Security Code Failed"; break;
                        default: result = "Unable to be determined"; break;
                    }
                }
                return result;
            }


            public static System.Collections.Hashtable splitResponse(string rawData)
            {
                System.Collections.Hashtable responseData = new System.Collections.Hashtable();
                try
                {
                    if (rawData.IndexOf("=") > 0)
                    {
                        // Extract the key/value pairs for each parameter
                        foreach (string pair in rawData.Split('&'))
                        {
                            int equalsIndex = pair.IndexOf("=");
                            if (equalsIndex > 1 && pair.Length > equalsIndex)
                            {
                                string paramKey = HttpUtility.UrlDecode(pair.Substring(0, equalsIndex));
                                string paramValue = HttpUtility.UrlDecode(pair.Substring(equalsIndex + 1));
                                responseData.Add(paramKey, paramValue);
                            }
                        }
                    }
                    else
                    {
                        responseData.Add("vpc_Message", "The data contained in the response was not a valid receipt.<br/>The data was: <pre>" + rawData + "</pre><br/>");
                    }
                    return responseData;
                }
                catch (Exception ex)
                {
                    // There was an exception so create an error
                    responseData.Add("vpc_Message", "\nThe was an exception parsing the response data.<br/>The data was: <pre>" + rawData + "</pre><br/><br/>Exception: " + ex.ToString() + "<br/>");
                    return responseData;
                }
            }


            public static string CreateMD5Signature(string RawData)
            {
                var hasher = System.Security.Cryptography.SHA1CryptoServiceProvider.Create();
                    //.MD5CryptoServiceProvider.Create();
                var HashValue = hasher.ComputeHash(Encoding.ASCII.GetBytes(RawData));
                return string.Join("", HashValue.Select(b => b.ToString("x2"))).ToUpper();
            }


    }


    public class PaymentRequest
    {
        public PaymentRequest()
        {
            Version = "1";
            Command = "pay";
            Merchant = ConfigurationManager.AppSettings["MigsMerchantID"];   //You have to change these values
            AccessCode = ConfigurationManager.AppSettings["MigsAccessCode"]; //You have to change these values
            MerchTxnRef = "";
            OrderInfo = "";
            Amount = "0";
            ReturnUrl = "";
            Locale = "en";
        }

        public string Version { get; set; }
        public string Command { get; set; }
        public string AccessCode { get; set; }
        public string MerchTxnRef { get; set; }
        public string Merchant { get; set; }
        public string OrderInfo { get; set; }
        public string Amount { get; set; }
        public string ReturnUrl { get; set; }
        public string Locale { get; set; }


        public Dictionary<string, string> GetParameters()
        {
            var parameters = new Dictionary<string, string> {
            { "vpc_Version" ,Version},
            { "vpc_Command",Command},
            { "vpc_Merchant" ,Merchant},
            { "vpc_AccessCode" ,AccessCode},
            { "vpc_MerchTxnRef" ,MerchTxnRef},
            { "vpc_OrderInfo",OrderInfo},
            { "vpc_Amount" ,Amount},
            { "vpc_ReturnURL", ReturnUrl},
            { "vpc_Locale",Locale}
        };
            return parameters;
        }
    }


    public class PaymentResponse
    {

        //region common properties
        public string ResponseCode { get; set; }
        public string ResponseCodeDescription { get; set; }
        public string Amount { get; set; }
        public string Command { get; set; }
        public string Version { get; set; }
        public string OrderInfo { get; set; }
        public string MerchantID { get; set; }
        //endregion

        //region on-successful-payment properties
        public string BatchNo { get; set; }
        public string CardType { get; set; }
        public string ReceiptNo { get; set; }
        public string AuthorizeID { get; set; }
        public string MerchTxnRef { get; set; }
        public string AcqResponseCode { get; set; }
        public string TransactionNo { get; set; }
        //endregion

        public string Message { get; set; }


        public PaymentResponse(HttpRequestBase Request)
        {
            Func<string, string> GetQueryStringValue = key =>
            {
                if (Request.QueryString.AllKeys.Contains(key))
                {
                    var result = Request.QueryString[key];
                    return result;
                }
                return "Unknown";
            };
            // Get the standard receipt data from the parsed response
            ResponseCode = GetQueryStringValue("vpc_TxnResponseCode");
            ResponseCodeDescription = PaymentHelperMethods.getResponseDescription(ResponseCode);
            Amount = GetQueryStringValue("vpc_Amount");
            Command = GetQueryStringValue("vpc_Command");
            Version = GetQueryStringValue("vpc_Version");
            OrderInfo = GetQueryStringValue("vpc_OrderInfo");
            MerchantID = GetQueryStringValue("vpc_Merchant");

            // only display this data if not an error condition
            if (ResponseCode == "0")
            {
                BatchNo = GetQueryStringValue("vpc_BatchNo");
                CardType = GetQueryStringValue("vpc_Card");
                ReceiptNo = GetQueryStringValue("vpc_ReceiptNo");
                AuthorizeID = GetQueryStringValue("vpc_AuthorizeId");
                MerchTxnRef = GetQueryStringValue("vpc_MerchTxnRef");
                AcqResponseCode = GetQueryStringValue("vpc_AcqResponseCode");
                TransactionNo = GetQueryStringValue("vpc_TransactionNo");
            }
            var message = GetQueryStringValue("vpc_Message");
        }

    }


    public class VPCStringComparer : IComparer<string>
    {
        public int Compare(string x, string y)
        {
            var myComparer = CompareInfo.GetCompareInfo("en-US");
            return myComparer.Compare(x, y, CompareOptions.Ordinal);
        }
    }
   
}