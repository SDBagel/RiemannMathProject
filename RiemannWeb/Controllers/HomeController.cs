using System;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RiemannWeb.Models;

namespace RiemannWeb.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            if (Request.Cookies.ContainsKey("DarkMode") && Request.Cookies["DarkMode"] == "true")
                ViewData["DarkMode"] = true;
            else
                ViewData["DarkMode"] = false;

            return View();
        }

        public IActionResult Terms()
        {
            if (Request.Cookies.ContainsKey("DarkMode") && Request.Cookies["DarkMode"] == "true")
                ViewData["DarkMode"] = true;
            else
                ViewData["DarkMode"] = false;

            return View();
        }

        public IActionResult Settings()
        {
            if (Request.Cookies.ContainsKey("DarkMode") && Request.Cookies["DarkMode"] == "true")
                ViewData["DarkMode"] = true;
            else
                ViewData["DarkMode"] = false;

            return View();
        }

        public IActionResult ToggleDarkMode()
        {
            if (Request.Cookies.ContainsKey("DarkMode"))
                Response.Cookies.Delete("DarkMode");
            else
                Response.Cookies.Append(
                    "DarkMode",
                    "true",
                    new CookieOptions()
                    {
                        Path = "/",
                        Expires = DateTime.MaxValue
                    }
                );

            return Redirect("~/settings");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
