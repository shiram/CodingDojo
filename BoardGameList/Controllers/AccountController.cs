using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BoardGameList.Constants;
using BoardGameList.DTO;
using BoardGameList.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BoardGameList.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = RoleNames.Administrator)]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ILogger<AccountController> _logger;
        private readonly IConfiguration _config;
        private readonly UserManager<BoardGameUser> _userManager;
        private readonly SignInManager<BoardGameUser> _signInManager;

        public AccountController(ApplicationDBContext context, ILogger<AccountController> logger, IConfiguration config, UserManager<BoardGameUser> userManager, SignInManager<BoardGameUser> signInManager)
        {
            _context = context;
            _logger = logger;
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [ResponseCache(CacheProfileName = "NoCache")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newUser = new BoardGameUser
                    {
                        UserName = registerDTO.UserName,
                        Email = registerDTO.Email
                    };
                    var result = await _userManager.CreateAsync(newUser, registerDTO.Password!);

                    if (result.Succeeded)
                    {
                        _logger.LogInformation($"User {newUser.UserName} ({newUser.Email}) created a new account.");
                        return StatusCode(201, $"User '{newUser.UserName}' has been created.");
                    }
                    else
                    {
                        throw new Exception(string.Format("Error: {0}", string.Join(", ", result.Errors.Select(x => x.Description))));
                    }
                }
                else
                {
                    var details = new ValidationProblemDetails(ModelState)
                    {
                        Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                        Status = StatusCodes.Status400BadRequest
                    };
                    return new BadRequestObjectResult(details);
                }
            }
            catch(Exception e)
            {
                var exceptionDetails = new ProblemDetails()
                {
                    Detail = e.Message,
                    Status = StatusCodes.Status500InternalServerError,
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1"
                };

                return StatusCode(StatusCodes.Status500InternalServerError, exceptionDetails);
            }
        }

        [HttpPost]
        [ResponseCache(CacheProfileName = "NoCache")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginDTO loginDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _userManager.FindByNameAsync(loginDTO.UserName!);
                    if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password!))
                    {
                        throw new Exception("Invalid login attempt");
                    }
                    else
                    {
                        var signingCredentials = new SigningCredentials(
                            new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config["JWT:SigningKey"])),
                            SecurityAlgorithms.HmacSha256
                        );
                        var claims = new List<Claim>
                        {
                            new (ClaimTypes.Name, user.UserName)
                        };

                        claims.AddRange(
                            (await _userManager.GetRolesAsync(user))
                            .Select(role => new Claim(ClaimTypes.Role, role))
                        );

                        var jwtObject = new JwtSecurityToken(
                            issuer: _config["JWT:Issuer"],
                            audience: _config["JWT:Audience"],
                            claims: claims,
                            expires: DateTime.Now.AddSeconds(300),
                            signingCredentials: signingCredentials
                        );

                        var jwtString = new JwtSecurityTokenHandler().WriteToken(jwtObject);

                        return StatusCode(StatusCodes.Status200OK, jwtString);
                    }
                }
                else
                {
                    var details = new ValidationProblemDetails(ModelState)
                    {
                        Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                        Status = StatusCodes.Status400BadRequest
                    };

                    return new BadRequestObjectResult(details);
                }
            }
            catch (Exception e)
            {
                var exceptionDetails = new ProblemDetails()
                {
                    Detail = e.Message,
                    Status = StatusCodes.Status500InternalServerError,
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1"
                };

                return StatusCode(StatusCodes.Status500InternalServerError, exceptionDetails);
            }
        }
    }
}
