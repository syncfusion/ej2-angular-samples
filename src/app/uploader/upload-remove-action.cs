using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Diagnostics;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;

namespace EJServices.Controllers
{
    public class UploadBoxController : ApiController
    {               
        [AcceptVerbs("Post")]
        public void Remove()
        {
            try
            {
                var fileSave = "";
                if (System.Web.HttpContext.Current.Request.Form["cancel-uploading"] != null)
                {
                   fileSave = System.Web.HttpContext.Current.Server.MapPath("UploadingFiles");
                }
                else
                {
                   fileSave = System.Web.HttpContext.Current.Server.MapPath("UploadedFiles");
                }
                var fileName = System.Web.HttpContext.Current.Request.Form["UploadFiles"];
                var fileSavePath = Path.Combine(fileSave, fileName);
                if (System.IO.File.Exists(fileSavePath))
                {
                    System.IO.File.Delete(fileSavePath);
                }
                HttpResponse Response = System.Web.HttpContext.Current.Response;
                Response.Clear();
                Response.Status = "200 OK";
                Response.StatusCode = 200;
                Response.ContentType = "application/json; charset=utf-8";
                Response.StatusDescription = "File removed succesfully";
                Response.End();
            }
            catch (Exception e)
            {
                HttpResponse Response = System.Web.HttpContext.Current.Response;
                Response.Clear();
                Response.Status = "200 OK";
                Response.StatusCode = 200;
                Response.ContentType = "application/json; charset=utf-8";
                Response.StatusDescription = "File removed succesfully";
                Response.End();
            }
        }
    }
}