using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RiemannWeb.Controllers
{
    public class CameraController : Controller
    {
        public IActionResult Index()
        {
            if (Request.Cookies.ContainsKey("DarkMode") && Request.Cookies["DarkMode"] == "true")
                ViewData["DarkMode"] = true;
            else
                ViewData["DarkMode"] = false;

            return View();
        }
    }
}