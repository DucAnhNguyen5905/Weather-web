using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecruitmentWebFE.Models;
using RecruitmentWebFE.Services;

namespace RecruitmentWebFE.Controllers
{
    [Authorize]
    public class PostController : BaseController
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }

        public async Task<IActionResult> Index()
        {
            var accessToken = GetAccessToken();

            if (string.IsNullOrWhiteSpace(accessToken))
            {
                return RedirectToAction("Index", "Login");
            }

            var posts = await _postService.GetAllPostsAsync(accessToken);
            return View(posts);
        }

        public async Task<IActionResult> Details(int id)
        {
            var accessToken = GetAccessToken();

            if (string.IsNullOrWhiteSpace(accessToken))
            {
                return RedirectToAction("Index", "Login");
            }

            var post = await _postService.GetByIdAsync(id, accessToken);

            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View(new CreatePostViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CreatePostViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var accessToken = GetAccessToken();

            if (string.IsNullOrWhiteSpace(accessToken))
            {
                return RedirectToAction("Index", "Login");
            }

            var success = await _postService.CreateAsync(model, accessToken);

            if (!success)
            {
                ModelState.AddModelError(string.Empty, "Tạo bài đăng thất bại.");
                return View(model);
            }

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var accessToken = GetAccessToken();

            if (string.IsNullOrWhiteSpace(accessToken))
            {
                return RedirectToAction("Index", "Login");
            }

            var post = await _postService.GetByIdAsync(id, accessToken);

            if (post == null)
            {
                return NotFound();
            }

            var model = new UpdatePostViewModel
            {
                Id = post.Post_ID,
                JobTitle = post.Job_Title,
                //JobDescription = post.JobDescription,
                //JobLocation = post.JobLocation,
                //Salary = post.Salary,
                //IsActive = post.IsActive
            };

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(UpdatePostViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var accessToken = GetAccessToken();

            if (string.IsNullOrWhiteSpace(accessToken))
            {
                return RedirectToAction("Index", "Login");
            }

            var success = await _postService.UpdateAsync(model, accessToken);

            if (!success)
            {
                ModelState.AddModelError(string.Empty, "Cập nhật bài đăng thất bại.");
                return View(model);
            }

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var accessToken = GetAccessToken();

            if (string.IsNullOrWhiteSpace(accessToken))
            {
                return RedirectToAction("Index", "Login");
            }

            await _postService.DeleteAsync(id, accessToken);
            return RedirectToAction(nameof(Index));
        }
    }
}