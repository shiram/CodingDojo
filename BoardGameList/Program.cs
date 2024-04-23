using BoardGameList.Constants;
using BoardGameList.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"))
        );

builder.Services.AddIdentity<BoardGameUser, IdentityRole>(options => 
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 12;
}).AddEntityFrameworkStores<ApplicationDBContext>();

builder.Services.AddAuthentication(options => 
{
    options.DefaultAuthenticateScheme = 
    options.DefaultChallengeScheme =
    options.DefaultForbidScheme = 
    options.DefaultScheme = 
    options.DefaultSignInScheme = 
    options.DefaultSignOutScheme =
        JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => 
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"]))
    };
});
   
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddMvc(options => 
{
    options.CacheProfiles.Add("NoCache", new CacheProfile()
    {
        NoStore = true,
        Duration = 0
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme{
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

//Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(cfg =>
    {
        cfg.WithOrigins(builder.Configuration["AllowedOrigins"]);
        cfg.AllowAnyHeader();
        cfg.AllowAnyMethod();
    });

    options.AddPolicy(name: "AnyOrigin", cfg =>
    {
        cfg.AllowAnyOrigin();
        cfg.AllowAnyHeader();
        cfg.AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Configuration.GetValue<bool>("useDeveloperExceptionPage"))
    app.UseDeveloperExceptionPage();
else
    app.UseExceptionHandler("/error");

app.UseHttpsRedirection();

//enable app to use cors
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//Use minimal api for error results
app.MapGet("/error",
    [EnableCors("AnyOrigin")]
[ResponseCache(NoStore = true)] () => Results.Problem());

app.MapGet("/error/test",
    [EnableCors("AnyOrigin")]
[ResponseCache(NoStore = true)] () =>
    { throw new Exception("test"); });

//test Code On Demand
app.MapGet("/cod/teat",
    [EnableCors("AnyOrigin")]
[ResponseCache(NoStore = true)] () => Results.Text(
        "<script>" +
        "window.alert('Your client supports Javascript!" +
        "\\r\\n" +
        $"Server Time (UTC): {DateTime.UtcNow.ToString("o")}" +
        "Client Time: ' + new Date().toString());" +
        "</script>" +
        "<noscript>Your Client does not support Javascript</noscript>",
        "text/html"
        )
    );

//test auth with authorization
app.MapGet(
    "/auth/test/1",
    [Authorize]
    [EnableCors("AnyOrigin")]
    [ResponseCache(NoStore = true)] () => {
        return Results.Ok("You are authorized to see this content");
    }
);

app.MapGet("/auth/test/2",
    [Authorize(Roles = RoleNames.Moderator)]
    [EnableCors("AnyOrigin")]
    [ResponseCache(NoStore = true)] () => {
        return Results.Ok("You are authorized to see this content as a moderator");
    }
);

app.MapGet("/auth/test/3",
    [Authorize(Roles = RoleNames.Administrator)]
    [EnableCors("AnyOrigin")]
    [ResponseCache(NoStore = true)] () => {
        return Results.Ok("You are authorized to see this content as an administrator");
    }
);


app.Run();