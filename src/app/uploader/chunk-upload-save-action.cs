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
                 
       public void MergeChunkFile(string fullPath, Stream chunkContent)
        {
            try
            {
                using (FileStream stream = new FileStream(fullPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
                {
                    using (chunkContent)
                    {
                        chunkContent.CopyTo(stream);
                    }
                }
            }
            catch (IOException ex)
            {
                throw ex;
            }
        }

        [AcceptVerbs("Post")]
        public void Save()
        {
            try
            {
                if (System.Web.HttpContext.Current.Request.Files.AllKeys.Length > 0)
                {
                    var httpPostedChunkFile = System.Web.HttpContext.Current.Request.Files["chunkFile"];
                    if (httpPostedChunkFile != null)
                    {
                        var saveFile = System.Web.HttpContext.Current.Server.MapPath("UploadedFiles");
                        var SaveFilePath = Path.Combine(saveFile, httpPostedChunkFile.FileName + ".part");
                        var chunkIndex = System.Web.HttpContext.Current.Request.Form["chunk-index"];
                        if (chunkIndex == "0")
                        {
                            httpPostedChunkFile.SaveAs(SaveFilePath);
                        }
                        else
                        {
                            MergeChunkFile(SaveFilePath, httpPostedChunkFile.InputStream);
                            var totalChunk = System.Web.HttpContext.Current.Request.Form["total-chunk"];
                            if (Convert.ToInt32(chunkIndex) == (Convert.ToInt32(totalChunk) - 1))
                            {
                                var savedFile = System.Web.HttpContext.Current.Server.MapPath("UploadedFiles");
                                var originalFilePath = Path.Combine(savedFile, httpPostedChunkFile.FileName);
                                System.IO.File.Move(SaveFilePath, originalFilePath);
                            }
                        }
                        HttpResponse ChunkResponse = System.Web.HttpContext.Current.Response;
                        ChunkResponse.Clear();
                        ChunkResponse.ContentType = "application/json; charset=utf-8";
                        ChunkResponse.StatusDescription = "File uploaded succesfully";
                        ChunkResponse.End();
                    }
                    var httpPostedFile = System.Web.HttpContext.Current.Request.Files["UploadFiles"];

                    if (httpPostedFile != null)
                    {
                        var fileSave = System.Web.HttpContext.Current.Server.MapPath("UploadedFiles");
                        var fileSavePath = Path.Combine(fileSave, httpPostedFile.FileName);
                        if (!System.IO.File.Exists(fileSavePath))
                        {
                            httpPostedFile.SaveAs(fileSavePath);
                            HttpResponse Response = System.Web.HttpContext.Current.Response;
                            Response.Clear();
                            Response.ContentType = "application/json; charset=utf-8";
                            Response.StatusDescription = "File uploaded succesfully";
                            Response.End();
                        }
                        else
                        {
                            HttpResponse Response = System.Web.HttpContext.Current.Response;
                            Response.Clear();
                            Response.Status = "204 File already exists";
                            Response.StatusCode = 204;
                            Response.StatusDescription = "File already exists";
                            Response.End();
                        }
                    }
                }
            }
            catch (Exception e)
            {
                HttpResponse Response = System.Web.HttpContext.Current.Response;
                Response.Clear();
                Response.ContentType = "application/json; charset=utf-8";
                Response.StatusCode = 204;
                Response.Status = "204 No Content";
                Response.StatusDescription = e.Message;
                Response.End();
            }
        }
    }
}