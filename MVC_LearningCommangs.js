//! Problem with ASP.Net Web Forms
//+ 1. Not seperation of aspx and aspx.cs
//+ performance issue, lot of burdon to the server toprocess controls each request

//+ MVC architecture is used. Architecture is devided to View Model and controller. we independantly develop each part

//! MVC
//! Model
//+ Data structure, business logic model
//! View
//+ Presentation Logic, Reads data from model
//!controller
//+ Defines execution flow
//+ execution starts from the controller
//+ Fills data to the model
//+pass model object to view

//! Advantages
//+ Allows seperation of units
//+ supports unit testing
//+ Supports dependancy injection
//+ Fast performance than web forms
//+ No page lif cycle, controls, postback and view state

//! COntroller
//+ Controller is a class, Controller recieve the request from the browser, calls the model and calls the view
//+ browser send the request to ISS and ISS send requst to MVC framework and then Identify the proper controller and invoke the proper controller. controller creatte
//+ the service model and pass the model to view. view woll use the model to display the data in the view and render the response anf send the response back to
//+ MVC framework and same will be send to Browser as response.

//+ Controller is generally a public class, it can be private as well.
//+ controller should inherit from System.Web.Mvc.Controller class.
//+ Should have a suffix as Controller. ProductsController.

//! Acction methods
//+ All the methods which are present inside the controller is treated as Action methods. Action method execute when browser sends a request.

//! MVC Folder structure
//+  \App_Start    -- Contains the files which need to be executed in the first request
//+  \App_Data     -- SQL server LocalDB Database Files
//+  \Controllers  -- Contains Controllers, we can cjhange the name of the folder
//+  \Models       -- Contains Models , name can be changed
//+  \Views        -- Contains Views
//+  \Views\web.config    --Contains config setting foe all views
//+ Global.asax      -- Contains application level and session level events
//+ \packages.config  --Contains list of Nuget paackages installed in the application
//+ web.config  -- Contains web application configuration settings that needs to beinitialized on each request.

//! Firstapplication
//+ App_Start have routeConfig.cs . we will mention the url patter that we need to redirect to. controller/acion/id.
//+ when we first call the controller. COntroller factory will create the object for the controller and invoke the methods
//+ we can create the view and give same name as the action method. it is not necessary to give same name. for different name we might need to specify the view manually
//* return View("OtherView");
//+ for every controller, view must be placed in seperate sub folder.
//% install Bootstrap
//+ we need to install jqury popper first
//* install-package JQuery
//* install-package Popper.js
//* install-package Bootstrap

//% we need to import essential jquery popper.js and bootstrap file to the system
//* <link href="~/Content/bootstrap.css" rel="stylesheet" />
//* <script src="~/Scripts/jquery-3.6.0.js"></script>
//* <script src="~/Scripts/umd/popper.js"></script>
//* <script src="~/Scripts/bootstrap.js"></script>
//+ File must be loaded in the same order

//! Action Result
//+ represents a parent class of a action result
//+ ActionResult is a class, that represents “result of an action method”.
//+ Asp.Net Mvc recommends to specify action method's return type as "ActionResult".
//+ ActionResult is an abstract class that has several child classes, you can return an object of any of
//+ the child classes.
//% Types
//+ ContentResult: Represents any content with specific content-type.
//+ ViewResult: Represents result of a view.
//+ FileResult: Represents content of a file.
//+ JsonResult: Represents json object / json array.
//+ RedirectResult: Represents redirection to other website (HTTP 302).
//+ RedirectToRouteResult: Represents redirection to a specific action method (HTTP 302).
//+ PartialViewResult: Represents the result of partial view.

//% Method to return different type of ActionResult
1. ContentResult: ContentResult Content(string Content, string ContentType)
2. ViewResult: ViewResult View(string ViewName)
3. FileResult: FileResult File(string FilePath, string ContentType)
4. JsonResult: JsonResult Json(object data, JsonRequestBehavior behavior)
5. RedirectResult: RedirectResult Redirect(string url)
6. RedirectToRouteResult: RedirectToRouteResult RedirectToAction(string ActionName, string ControllerName)
7. PartialViewResult: PartialViewResult PartialView(string ViewName)

//! section view
//+ Sections are used to display view-specific content in the layout view.
//+ Sections are defined in the view and rendered in the layout view.
//+ mention the section content in normal view and use the content in layout using @RenderSection(name).
//+ @section studentSection{
//+     <a href="#" class="list-group-item text-white" style="background-color:transparent">student</a>
//+ }
//+ @RenderSection("studentSection". required: false)   // we can use required false to make sure that even if we dont provide the sections. it will not throw exception

//! _ViewStart.cshtml
//+ It defines the default layout view of all the views of a folder. only layout statement is allowed in this file
//+ If it is present in "Views" folder, it defines the default layout view of all the views of entire project.
//+ If it is present in "Views\Controllername" folder, it defines the default layout view of all the views of same controller only.
//+ Flow of Execution: Controller > _ViewStart.cshtml of “Views” folder > _ViewStart.cshtml of “Controller1” folder > View > Layout View > Generate View Result > Response
//* @{
//*     Layout = "~/Views/Shared/_Layout.cshtml";
//* }

//+ if we specifically give viewstart and layout for one controller, then only for those controller loayout can be different. viewstart from the specific controller
//+ folder will replace the common viewstart and layout. we can give differnt viewstart nd layout for differnt views.

//! Partial views
//+ Partial View is a small view that contains content that can be shared among multiple views.
//+ Can be present in "Views\Controllername" folder or in "Views\Shared" folder.
//% Difference
//+ View
//+ View can contain a layout page.
//+ _ViewStart.cshtml file will be called before the execution of view.
//+ View can have html structured elements such as html, head, body etc.
//+ Partial view
//+ Partial view doesn’t contain a layout page.
//+ _ViewStart.cshtml file will not be called before the execution of partial view.
//+ Partial view doesn’t contain any html structured elements such as html, head, body etc.

//! URL Routing
//+ URL Routing is a pattern-matching-system that monitors the incoming request url and figure out what to do with that.
//+ It allows you to create meaningful URLs, instead of mapping to physical files on the server.
//+ Route is a URL pattern which includes literals / parameters.
//+ Literal is a fixed text that must be present in the URL.
//+ Parameter is a variable, which value can be entered by the user.
//+ All the routes are stored in “Routing table”, which will be stored in memory (RAM).

//+ Routing Table contains the list of routes.
//+ When the request is received from the browser, the Routing Engine (part of Asp.Net Mvc Framework) searches whether the actual URL is matching with 
//+ any one of the routes in the RouteTable. If one matches, it goes to the corresponding controller.
//+ we need to add RouteConfig.RegisterRoutes(Routetable.Routes) in Application_Start() in Global.asax file.
//+ then we need to write routes.MapRoute in RegisterRoutes function.
//+ first argument is name : unique name
//+ send argument is url: incoming URL

//% If we give <trace enabled = "true"> in system.web in config file, we can use it to see the request camt to the application. we need to go to localhost/trace.axd
//+ routes.IgnoreRoute() used to enable such special files
//+ we can makntion the id for the URl and we can pass id in routing. we can mention it as optional as well, we can directly mention specific controller and action method name in the route
//+ we can mention the incoming data types variable using constraints property

//! Attribute routing
//+ new way of doing it. we can mention the url as a attribute above the action method
//* [Route("Products/StudentDetails/{id:int?}")]
//* public ActionResult StudentDetails(int id)
//* {
//% Need to go back
//+ Model is a class that defines structure of the data that you want to store / display.
//+ Also contains business logic.
//+ Model will be called by Controller and View.

//! Models
//+ we can pass models in the viewbag.
//! Strongly typed views
//+ View that is associated to a specific model class is called as "Strongly Typed View".
//+ Strongly typed views have to specify the model class name with @model directive at the top of the view.
//+ Strongly Typed Views can receive model objects from the controller.
//+ we can directly pass the object in the view method in controller
//* @model Product_details.Models.ProductsModel
//* @model List<Product_details.Models.ProductsModel>

//! Model Binding
//+ Input variables are automatically converted to object and initialize the variables
//+ Model Binding can work with Complex Types.
//+ Model Binding can automatically convert form field data or query string values to the properties of a complex type parameter of an action method.
//+ Default values are null or zero (0)
//% Source of model Binding
//+ Query String
//+ Form Data Ex: <input type="text” name=“EmpName’>
//+ Route Data
//+ JSON request body [in case of AJAX]

//% While giving href. use @Url.Action("Controller","Action")
//* <form action="/Products/Create" method="post">    --+ we can use somthing like this to call the ActionMethod and if we mention the method as post and mention the action method as HTTP Post, then for this method post action will be called.
//*     <div class="form-group">
//*         <label>Product Id</label>
//*         <input type="text" class="form-control" id="txtProductId" placeholder="Product Id" name="ProductId">
//*     </div>
//*     <button class="btn btn-success">Submit</button>
//* </form>
//+ we will reciever the variables as input parameters in the ActionMEthods.
//% Bind Attribute
//+ We can specify which values you need to submit to the model using bind Attribute
//+ The [Bind] Attribute allows you to specify the list of properties that you want to bind into the model object, that is received using "Model Binding".
//+ It allows you to specify "Include" and "Exclude" comma-separated list of properties.
//* public ActionResult AddProduct([Bind(Include = "ProductId,ProductName")] ProductsModel productsModel) here only this values will be binded

//% Custom modelBinder

//% For datetime, we need to convert it to string specific format to show it properly in UI (HTML)
//+ For creating the static dropdown list, we can use html select flag
//* <select type="text" class="form-control" id="AvailabilityStatus" name="AvailabilityStatus" placeholder="Availability Status">
//* <option value="InStock">In Stock</option>

//% Creating dynamic view
//+we can use foreach and pass the value to the options. to make the item selected, we need to make the option tag as selected using the condition
//* <option value="@item.BrandID"  @(Model.BrandID == item.BrandID ? "selected" : "")>@item.BrandName</option>

//! for ascending and descendinng
//% we can add https://fontawesome.com/ library for showing the icon for ascending and descending. we can install it using nuget package manager package-install FontAwesome
//+ <link href="~/Content/font-awesome.css" rel="stylesheet" /> for adding it to the htnl

//+ for the functionality, how we do is, we import the icon library and the in the controller action method will have 2 more variable for sortcolumn and sortorder 
//+when we load the action method for the first time, we will make these variable to default value. after that using if condition, we will sort the items and pass
//+ the items to the view. In view, we will make the header as clickable by changing it to anchor. we will use the same icon as per the sort(only for the specific current sort column)
//+ for other sort column, we dont add any sorting icon. but for the click event, we will send the opposite icon to the controller

//! Pagination
//+ for pagination we will pass 1 as page number by default. we will find the number of pages by deviding the total count. then we we pass page number as well as
//+ number of pages to the cshtml. then we show the next and prev button and pass the prev and current page number as the query string. then we loop the page number
//+ using number of pages and then if the loop value is same as the current page number, we make the class active. and add the anchor tag with page number

//! SAving photos in DB
//+ for saving the image in Db, we can convert it to base64 format. we can create a column of type varchar max.
//+ in cshtml, we need to add enctype="multipart/form-data" in form element to work. and add file tag <input type="file" class="form-control-file" id="Image" name="ImageBase64" />
//+ we can find the file in Request.File. if there is multiple file, we might need to loop it.
//* if (Request.Files.Count > 0)
//* {
//*     var file = Request.Files[0];
//*     var imgByte = new Byte[file.ContentLength];
//*     file.InputStream.Read(imgByte, 0, file.ContentLength);
//*     var base64Image = Convert.ToBase64String(imgByte, 0, imgByte.Length);
//*     productsModel.ImageBase64 = base64Image;
//* }
//+ we can use image tag for displaying.
//* <td><img src="data:image;base64,@item.Photo" width="100px" /></td>

//! HTML helpers
//+ Binds HTML elements to Model Properties. Pre-defined methods that execute on server and generate (render) a specific html tag at run time. @HtmL is an object of HtmlHelper class.
//+ HtmLActionLink  - Hyperlink
//+ Html. TextBoxFor  - Textbox
//+ HtmLTextAreaFor  - TextArea
//+ Html. CheckBoxFor  - CheckBox
//+ Html. RadioButtonFor  - RadioButton
//+ Html. DropDownListFor  - Dropdown
//+ Html ListBoxFor  - Multi-Select ListBox
//+ Html. HiddenFor  - Hidden Field
//+ HtmL.PasswordFor  - Password TextBox
//+ Html DisplayFor  - Plain text
//+ Html. LabelFor  - Label
//+ HtmLEditorFor  - TextBox / TextArea / Numeric TextBox / Date TextBox etc.

//+ NOrmal typed http helpers will not have For HTMl.Label. can be used for viewbags
//+ Strongly typed will have For, if we want to create a html helpers with model, we can use strongly typed html helpers
//* <label for="search" class="mr-1">Search:</label>
//* @Html.Label("Search", new { @class = "MR-1"}) above tag can be replaced by this
//* @Html.TextBox("Search", ViewBag.search as string, new { @class= "form-control mr-1", @placeholder="Search"})
//* <input type="search" class="form-control mr-1" id="search" name="search" placeholder="Search" value="@ViewBag.search"> we can change to this

//* <a href=@Url.Action("AddProduct", "Product")>Add product</a>
//* @Html.ActionLink("Add Product", "AddProduct", new { controller = "product"})

//* <form action="/product/AddProduct" method="post" enctype="multipart/form-data">
//* @using (Html.BeginForm("AddProduct", "product", FormMethod.Post, new { enctype = "multipart/form-data" }))
//* {
//* }

//+to make the html helpers in the form to be strongly typed. we should make the view as strongly typed.

//* @Html.TextBoxFor(temp => temp.ProductName, new { placeholder ="Product Name", @class = "form-control" })
//* <input type="text" class="form-control" id="ProductName" name="ProductName" placeholder="Product Name"></input>
//* 
//* @Html.RadioButtonFor(temp => temp.AvailabilityStatus, "InStock", new { @class = "form-check-input", id = "InStock" })
//* 
//* <select type="text" class="form-control" id="CategoryID" name="CategoryID" placeholder="Category ID">
//*     <option value="">Please Select</option>
//*     @foreach (var item in ViewBag.Categories)
//*     {
//*         <option value="@item.CategoryID">@item.CategoryName</option>
//*     }
//* </select>
//* @Html.DropDownListFor(temp => temp.CategoryID,  new SelectList(ViewBag.Categories, "CategoryID", "CategoryName"), "Please Select", new { @class = "form-control" })
//* @Html.DropDownListFor(temp => temp.AvailabilityStatus, new List<SelectListItem>() {
//*     new SelectListItem() { Text = "In Stock", Value = "InStock" },
//*     new SelectListItem() { Text = "Out of Stock", Value = "OutOfStock" }
//* }, "Please Select", new { @class ="form-control" })
//* 
//* @Html.CheckBoxFor(temp => temp.Active.Value, new { @class = "form-check-input", value = "true" })
//* <input class="form-check-input" type="checkbox" id="Active" name="Active"></input>

//! Customosing label for strongly typed helpers
//+ we can add a new attribut on the model. on each property. [Display(Name="Product ID")]

//! Custom HTML helpers
//+ Can be used to write common html generation and can be reusable.
//% Go back to this topic

//! Validations
//+ Defined by using Data Annotations(Attribute).
//+ Data annotations are provided by System.ComponentModelL. DataAnnotations namespace.
//+ [Required] - Field is mandatory.
//+ [MaxLength] - Maximum no. of characters.
//+ [MinLength] - Minimum no. of characters.
//+ [Range] - Value should be within the min and max.
//+ [Compare] - Two fields must be same.
//+ [RegularExpression] - Pattern of value.
//+ [EmailAddress] - Email address only accepted.
//+ ModelState.IsValid will check all the validation rules an returns false if fails. check the value in the controller before doing the actiion
//+ For client side validation, we need to install jquery packages. jquery, jquery.validation
//* <script src="~/Scripts/jquery.validate.js"></script>   used for the validation rulles .
//* <script src="~/Scripts/jquery.validate.unobtrusive.js"></script>     used to show or hide the validation messages
//+ @Html.ValidationMessageFor(temp => temp.ProductName) use this for the message

//! Custom error messages
//* [Required(ErrorMessage="custom error message")]
//% For validation summary
@Html.ValidationSummary() it  should be inside the form

//* [RegularExpression(@"^[A-Za-z ]*$", ErrorMessage = "Alphabets only")]
//* [MaxLength(40, ErrorMessage = "Product name can be maximum 40 characters long")]
//* [MinLength(2, ErrorMessage = "Product name should contain at least 2 characters")]
//* [Range(0, 10000, ErrorMessage = "Price should be in between 0  and 10000")]

//! Custom validation
//% Go back to this

//! Identity
//+ "Asp.Net Identity" is a framework to store and manage user accounts in web applications.
//+ It has four major components / packages:
//+ 1) Microsoft.AspNet.Identity.Core - Managing Users and Roles
//+ 2) Microsoft.AspNet.Identity.EntityFramework -Storing users information in database
//+ 3) Microsoft.AspNet.Identity.Owin -User Login and Logout & Social Login
//+ 4) Microsoft.Owin.Host.SystemWeb - Used to run OWIN based apps on IIS
//+ we need to install following packages
//* Install-package EntityFramework
//* Install-package Microsoft.AspNet.Identity.EntityFramework
//* Install-package Microsoft.AspNet.Identity.Owin
//* Install-package Microsoft.Owin.Host.SystemWeb

//+ //! Identity User
//+ The Microsoft.AspNet.Identity.EntityFramework.IdentityUser class represents the user details,
//+ which should be stored in the database.Implements |User<TKey> interface. Requires an ID and Name field for every user.
//+ public class ApplicationUser : IdentityUser
//* {
//* public dataType YourProperty { get; set; }
//* //You can add properties here
//* }

//!IdentityDBContext
//+ The Microsoft.AspNet.Identity.EntityFramework.ldentityDbContext class is the DbContext for Identity, which is responsible for interaction between identity entity model and the database.
//+ Implements IdentityDbContext<TUser> interface.
//* public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
//* {
//*     public ApplicationDbContext( ) : base("DefaultConnection")
//*     {
//*     }
//*     //You can add DbSet's here
//* }

//! UserStore
//+ The Microsoft.AspNet.Identity.EntityFramework.UserStore class DbContext for Identity, which is responsible for storing the identity data in the database, using IdentityDbContext.
//+ Implements |UserStore<TUser, TKey> interface.
//* public class ApplicationUserStore : UserStore<ApplicationUser>
//* {
//* public ApplicationUserStore(ApplicationDbContext dbContext) : base(dbContext)
//* {
//* }
//* //You can add your methods here
//* }

//! User Manager
//+  The Microsoft.AspNet.Identity. UserManager class DbContext for Identity, which is responsible for manipulating the identity data, based on the UserStore.
//+  Implements IUserManager<TUser, TKey> interface.
//+  public class ApplicationUserManager : UserManager<ApplicationUser>
//* {
//* public ApplicationUserManager(|UserStore<ApplicationUser> store) : base(store)
//* {
//* }
//* //You can add your methods here
//* }

//+ right click on project and add owinstartup class. 
//+ add below line of code inside configuration method
//* app.UseCookieAuthentication(new CookieAuthenticationOptions() { AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie, LoginPath = new PathString("/Account/Login") } );
//+ Authenticationtype is we mantioning that we need to store the authentication details in a coockie. and loginpath is wher weredirect the user if he sisnt login properly
//+ right click on project add folder as identity. create class as ApplicationUser.cs inherit from IdentityUser. by default have some properties like email password
//+ phone number, we cann extra properties in the class. in web.config, we can add a new connection string. add new class in identity name as ApplicationDBContext which
//+ inherit from IdentityDBContext<ApplicationUser>. ApplicationUser is what we created the lasttime. pass the connection string to the connection string to the
//+ construction run migrations in the DB . for working with multipl emigrstions we need to mention the configuration name every time
//+ Add applicstion user store class. ApplicationUserStore:UserStore<ApplicationUser> . pass dbcontext tothe bas classuserstore will directly interact with the
//+ context and do the operations. used for doing operations like check password or is email verified. . Add a  new item for ApplicationUserManager:userManager<ApplicationUser> .
//+ Pass IUserStore<ApplicationUser> to the base. Application manager is used to manage the user data.
//+ In this example project, we are planning to have 3 roles. Admin manager and customer 1 user for Admin anad manager. multiple customers. when we execute the
//+ application for the first time, we will create the 2 user. system will call the configuration method in startup class. we can create one more method and we can
//+ call it in the configuration method. we can create user and role in this function for the first time. To modify the roles we need rolemanager. to work with user, we need usermanaager.
//+ create the objects for rolemanager, dbcontext,appuserstore,applicationusermanager. check whether admin role exist, if not, create it. check the admin user 
//+ exist, if not create. if the user creation success, then we attach the role to the user. do the same for the manger. but for the customer, only create the role.

//* var dbCOntext = new ApplicationDBContext();
//* RoleManager<IdentityRole> roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(dbCOntext));
//* var appUserStore = new ApplicationUserStore(dbCOntext);
//* var applicationUserManager = new ApplicationUserManager(appUserStore);
//*
//* //Create Admin Role
//* if(!roleManager.RoleExists("Admin"))
//* {
//*     var role = new IdentityRole();
//*     role.Name = "Admin";
//*     roleManager.Create(role);
//* }
//* // Create admin role
//* if (applicationUserManager.FindByName("admin") == null)
//* {
//*     var user = new ApplicationUser();
//*     user.UserName = "admin";
//*     user.Email = "admin@gmail.com";
//*     string passsword = "Admin123";
//*     var chkUser = applicationUserManager.Create(user, passsword);
//*     if (chkUser.Succeeded)
//*     {
//*         applicationUserManager.AddToRole(user.Id, "Admin");
//*     }
//* }

//! Registration Page
//+ RegistrationView contains all the fields we can show on the view. we create a strongly typed view model to use it on the view and mention the error messages. create a new AccountController. and add the view and mention the form with aith all the inputs strongly typed.
//+ create a post method for recieving the register. create the context then userstore and usermanager. then hash the passwork using crypto. then create a user 
//+ object. and create a user. if succeeded , add the role. then login the user. we need authentication manager, we can get it from the owin. create an identity and 
//+ using authenticationmanager , do a login. In the layout we can show the user name, we can use a @User property which contains the logged in user information. @User.Identity.Name
//* var dbContext = new ApplicationDBContext();
//* var userStore = new ApplicationUserStore(dbContext);
//* var userManager = new ApplicationUserManager(userStore);
//* var passwordHash = Crypto.HashPassword(registerViewModel.Password);
//* var user = new ApplicationUser() { Email = registerViewModel.Email, UserName = registerViewModel.Username, PasswordHash = passwordHash, Address = registerViewModel.Address, PhoneNumber = registerViewModel.Mobile };
//* IdentityResult result = userManager.Create(user);
//* if (result.Succeeded)
//* {
//*     userManager.AddToRole(user.Id, "Customer");
//*
//*     var authenticationManager = HttpContext.GetOwinContext().Authentication;
//*     var userIdentity = userManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);
//*     authenticationManager.SignIn(new AuthenticationProperties(), userIdentity);
//* }
//* return RedirectToAction("Index", "Home");

//* @if (User.Identity.IsAuthenticated)
//* {
//*     <div class="text-white">
//*         Welcome to, @User.Identity.Name
//*     </div>
//* }

//+ For logging in, create a view and get the data in the post method, check the email and password using the usermanager.Find method. verify the user by null check. then login using owen.
//* var dbContext = new ApplicationDBContext();
//* var userStore = new ApplicationUserStore(dbContext);
//* var userManager = new ApplicationUserManager(userStore);
//* 
//* ApplicationUser applicationUser = userManager.Find(loginViewModel.Username, loginViewModel.Password);
//* if (applicationUser != null)
//* {
//*     var authenticationmanager = HttpContext.GetOwinContext().Authentication;
//*     var userIdentity = userManager.CreateIdentity(applicationUser, DefaultAuthenticationTypes.ApplicationCookie);
//*     authenticationmanager.SignIn(new AuthenticationProperties(),userIdentity);
//*     return RedirectToAction("Index", "Home");
//* }

//+ For logout, we can call the action method and we can crearte object of authenticationmanager and do a logout. automatically logout will perform.
var authManager = HttpContext.GetOwinContext().Authentication;
authManager.SignOut();
return RedirectToAction("Login");

//% My profile
//+ Get the user in the controller using manager.FindById methos. we can get the id of the user in User.Identity.GetID(). pass the user to the view
//* var dbContext = new ApplicationDBContext();
//* var userStore = new ApplicationUserStore(dbContext);
//* var userManager = new ApplicationUserManager(userStore);
//* ApplicationUser applicationUser = userManager.FindById(User.Identity.GetUserId());
//* return View(applicationUser);

//! Areas
//+ Areas represents parts of the project , Areas contains its own set of controllers, models and views
//+ Area must be registered using a class which inherit from a class called AreaRegistration. and should return name using  a property.
//+ To add area. right click on the project , add item and then click scuffold items, mvc, area. give a name.
//+ One area folder will be created, then the each folder will be created. Inside each area, there are area registration class. we can give the area name and routing mechanism. there will  be a specific routing for the each area. All the path should follow the Area route.
//* @using (Html.BeginForm("Create", "Products", new { area = "Admin" }, FormMethod.Post, new { enctype = "multipart/form-data" }))  while using areas we need to mention the link.
//* RedirectToAction("Index", "Home", new { area = "Admin" } );  while redirecting to a specific area
//* @Html.ActionLink("Details", "Details", new { id = item.ProductID, controller = "Products", area = "Admin" })
//+ if area and other controller have same name and if it make ambuigity between the naem in default route. we can mention the namespace in the routeconfig
//* routes.MapRoute(
//*     name: "Default",
//*     url: "{controller}/{action}/{id}",
//*     defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
//*     namespaces: new[] { "EFDbFirstApproachExample.Controllers" }
//* );

//+ To check if the role of the user we ca use userManager.IsInRole(user.Id, "Manager")

//% To view the users, call the DBcontext.users.Tolist();

//! Filters
//% Filters Execute at a specific situation, while executing an action method.
//% Authentication Filters
//+ Executes first, before any other filter, to check whether the user is a valid user or not.
//+ Implemented using lAuthenticationFilter
//% Authorization Filters
//+ Executes first, before any other filter, to check whether the user has permission to execute the action method or not.
//+ Implemented using lAuthorizationFilter
//% Action Filters
//+ Executes before and after of action method execution. You can modify the ViewBag, before sending it result.
//+ Implemented using lActionFilter
//% Result Filters
//+ Executes before ard after of result execution. You can modify the result.
//+ Implemented using IResultFilter
//% Exception Filters
//+ Executes when an exception is raised while executing the action method or result. You can store exception log.
//+ Implemented using IExceptionFilter
Browser - Server - IAuthenticationFilter.OnAuthenticate - IAuthorizationFilter.OnAuthorization - IActionFilter.OnActionExecuting - Execute the Action Method - IActionFilter.OnActionExecuted - IResultFilter.OmResultExecuting - Execute the result - IresultFilter.OnResultExecuted. - Response

//! Authentication Filters
//+ Create a new folder named filters. create  class with proper name. Inherit from FilterAttribute and Impliments IAUthenticationFilter. create a method, OnAuthentication(AuthenticationContext filterContext). this methd will be invoked automatically before the actionmethod. check whether the user is authenticated or not. we can return HttpUnathorizedResult(). There is another method called OnAuthenticatopnChallange, it will be executed after OnAuthentication()
//+ for calling the filter, use the filter before the ActionMethod as Attribute
//* public void OnAuthentication(AuthenticationContext authenticationContext)
//* {
//*     if(!authenticationContext.HttpContext.User.Identity.IsAuthenticated)
//*     {
//*         authenticationContext.Result = new HttpUnauthorizedResult();
//*     }
//* }
//!Autherization Filter
//+ Used to autherize user previlages. we need to create a new class with Filter Attribute onherited and IAutherizationFilter Implimented. create OnAutherization method to checkthe permission
//* public void OnAuthorization(AuthorizationContext filterContext)
//* {
//*     if(!filterContext.HttpContext.User.IsInRole("Admin"))
//*     {
//*         filterContext.Result = new HttpUnauthorizedResult();
//*     }
//* }

//! IActionFilter
//+ before the action method OnActionExecuting will perform. and after action method OnActionExecuted performs.
//+ Create a class MyActionFilter inheriting from FilterAttribute and impliments IActionFilter, we can create 2 methods OnActionExecuting and OnActionExecuted. we can get controller name or httpcontext or ViewBag or other properties from the filtercontext.
//* public void OnActionExecuted(ActionExecutedContext filterContext)
//* {
//*     filterContext.Controller.ViewBag.Visitors = 50;
//* }
//* public void OnActionExecuting(ActionExecutingContext filterContext)
//* {
//*     filterContext.Controller.ViewBag.Visitors = 70;
//* }

//! IResultFilter
//+ Executes before and after of result execution. You can modify the result. OnResultExecutin and OnResultExecuted
//* public void OnResultExecuting(ResultExecutingContext filterContext)
//* {
//*     filterContext.Controller.ViewBag.Visitors = 90;
//* }

//! IExceptionFilter
//+ OnException Executes when exception is there.
//* public void OnException(ExceptionContext filterContext)
//* {
//*     string errorMessage = "Message" + filterContext.Exception.Message;
//*     StreamWriter sw = File.AppendText(filterContext.RequestContext.HttpContext.Request.PhysicalPath + "\\ErrorLog.txt");
//*     sw.WriteLine(errorMessage);
//*     sw.Close();
//*     filterContext.ExceptionHandled = true;
//*     filterContext.Result = new RedirectResult("~/Error.html");
//* }

//! GlobalFIlters
//+ Global Filters gets applied to all controllers by default. Global Filters are registered in FilterConfig.cs at App_Start folder.
//+ The FilterConfig class has a method called RegisterGlobalFilters, which receives an argument of type GlobalFilterCollection, in which you can add any no. of built-in or custom filters.
//+ we need to call the function from App_Start folder Global.asax file, which gets called on the first request of the application
//+ Create a new class FilterConfig in App_Start Folder. create RegisterGlobalFilter(GlobalFilterCollection) and call the method from Global.asax file
//* public class FilterConfig
//* {
//*     public static void RegisterGlobalFilter(GlobalFilterCollection globalFilterCollection)
//*     {
//*         globalFilterCollection.Add(new MyExceptionFilter());
//*     }
//* }
//* FilterConfig.RegisterGlobalFilter(GlobalFilters.Filters);  --global.asax

//! Filter Overrides
//+ if we dont want to apply a  global filter on a specific method or controller on the application we can exclude it.
//+ Types of Filter Overrides:
[OverrideAuthentication]
[OverrideAuthorization]
[OverrideActionFilters]
[OverrideResult]
[OverrideException]
//+ we can use the attribute on any filters

//! Built In Filters
//* Authorization Filters
//* [ChildActionOnly] : Accepts only child requests (not direct requests).
//* [ValidateAntiForgeryToken] : Accepts only the requests from same domain. Useful for CSRF security
//* [Authorize] : Accepts only if the user has logged-in.
//* Action Filters
//* [ActionName] i Defines name of action, which is different than method name.
//* [NonAction] : Defines that the method is not an action method.
//* [HttpGet] : Accepts only GET request.
//* [HttpPost] : Accepts only POST request.
//* [OutputCache] i Caches result of action method & delivers the same for subsequent requests.
//* Result Filters
//* (No filters)
//* Exception Filters
//* [HandleError] : Redirects to custom error page, when exception is raised.

//!Output Caching
//+ Purpose: Improving page loading time of a view.
//+ Caches (stores) result of the action method in cache memory and delivers the same for all
//+ subsequent requests of any client.
//+ Things to keep in mind:
//+ * Avoid caching contents that are unique per user.
//+ * Avoid caching contents that are accessed rarely.
//+ * Use caching for contents that are accessed frequently.
//* [OutputCache(Duration = seconds)]
//* public ActionResult Methodname( )
//* {
//* }

//! Action Name
///+ helps to specify different action name than the method.
[ActionName("NameForTheAction")]

//! NonAction
//+ If we want a public method and does not want it to be a action method. we can use [NonAction]

//! ChildActionOnly
//+ Child Action can only used from within a view. cannot be invoke using user url
//+we can invoke using Httml.RenderAction or PartialView.
//* public ActionResult DisplaySingleProduct(Product product) {
//*     return PartialView("MyProduct", p)            --This is used to return and render a partial view
//* }

//! CSRF
//+ CSRF / XSRF(Cross Site Request Forgery) is a process of sending a request to actual website, from a
//+ page present in attacker website, based on the logged -in session of actual website user.
//+ When the user opens the Mybank.com and the coockies will be daved inside the browser. and later the user open some malicious website in another tab, and unknowingly click on some button. so attacker use the coockie and send the reqest to the bank and stole the money. because bank douesnt verify where the requesr comin from
//+ we need to check if the request coming from  aproper website. we need to write a html @Html.AntiForgeryToken(),//+ we need to write [ValidateAntiForgeryToken] attribute on the method.
//+ How it works? On the request from browser to the mybank.com, mybank will sends Auth cookie and Verification as cookie and hidden field
//+ and when user send another request, both coockie and hidden field will be send to the action method and MVC will verify. if succesful, then only action method will execute. when attacker sends a request, hidden will not be there, so it rejects.
//+ for using, best suggeston, whenever we have a form, inside that html.AntiforgeryToken and for the post action method have validateAntiForhgeryToken attribute.

//! ExceptionHandling
//+ Used to show custom error message than the exception page
//+ Types
//+ IExceptionFilter, handleError, Http Errors, Application_Error

//% HandleError
//+ HandleError is a pre - defined filter, which implements "IExceptionFilter’.
Advantage: Ready - to - use
Disadvantage: Doesn't support to add custom logic to generate logging of exceptions.
//+we can pass the HandleErrorAttribute to the RegisterGlobalFilters. but we cannot do a custom logic like logging. automatically redirect to the error page. in web.config <system.web> we need to add <customErrors mode= "on"> . there are other 2 options. and create a error page in shared. we can mention the exception type as well as the view
//* public class FilterConfig {
//*     public static void RegisterGlobalFilters(GlobalFilterCollection filters) {
//*         filters.Add(new HandleErrorAttribute(){ ExecutionType=Typeof(exception), View="Error" });
//*     }
//* }

//+ In the view we can get the exception details in @model

//! HTTP Errors
//+ We can handle http error status codes such as 404, 500 etc
//+ in web.config we can redirect to a specific action method. <customerrors
//* <customErrors mode="RemoteOnly">
//*     <error statusCode="404" redirect="/controller/action" />
//*     <error statusCode="401" redirect="/controller/action" />
//*     <error statusCode="500" redirect="/controller/action" />
//* </customErrors>

//% Application_Error
//+ Global error handler
//+ used to handle the exception which handles the exception raised beyond the action method and views
//* protected void Application_Error()
//* {
//*     Exception exc = Server.GetLastError();
//*     //store exception log
//*     Response.Redirect("~/Controller/action");
//* }

//+ we can pass the error.html as well.

//! Service pattern
//% WE need to go back

//! Dependancy Injection\
//+ creating an object outside and injecting to another class. This//+ Dependancy Injection is a process of creating object of repository/service class at run time , and passing its referances to the service class or controller through its constructor
//+ Advantages : The controller can change its repository so we can perform unit testing on controller
//+ we need to instal Unity.Mvc package. automatically create a UnityConfig.cs. we can register the services there.
//+ in register tupes, we can register a new service.contaoner.RegisterType < IProductService, ProductService > (); which means, if the controller have a iproductService in any class, then it will automatically create ProductService object and pass it to the controller.
//* public class ProductController : Controller
//* {
//*     IProductService productService;
//*     public ProductController(IProductController p)
//*     {
//*         this.productService = p;
//*     }
//* }

//! Repository pattern
//+ Repository sits between Controller and Data Access Layer. Repository contains methods for CRUD operations. Repository makes controller directly independ on Data Access Layer.
//+ controller > service > repository> data-access-layer
//% Go back to the topic

//! View Data
//+ View data is a way to transfer data to the view
//+ ViewData["key"] = value;
//+ view data re initialized in every request
//+ Viewdata internally use dictionarry. but in the view we need to typecast the data in the view.

//! ViewBag is used to transfer data from controller to view
//+ viewbag is dynamic based which means its no need to declare the member of the viewbag
//+ returns null if there is no data. viewbag have lefe time per request

//! TempData
//+ Used to tramsfer data from one action method to another action method, in case of redirection . delete automatically when requests ends
//+ Dictionary based. Internally use sessions. must be type casted before use. need to check for null value.
//* public ActionResult Index()
//* {
//*     TempDatal["Message"] = “Hello”;
//*     return RedirectToAction("Index2");
//* }
//* public ActionResult Index20)
//* {
//*     string s = Convert.ToString(TempDatal["Message"]
//*     return View();
//* }

//+ When we already use the tempdata, it will be deleted at the end of the request and will not be available for the next request.
//+we can use TempData.Keep("key") this will keep the data from deletion.
//+ Instead of doing both retreving and calling keep. we can use peek. TempData.Peek("key") will retreive the value as well as mark it not delete

//! ASP.net Web API
//+ Web Api" Framework is used to create HTTP services, that can be called from any application, using HTTP protocol.
//+ eb Api Service / Http Service executes when the browser sends request using AJAX. It performs CRUD operations on database table.
//+ Can be accessible from any application.
//+ Supports RESTful standards (GET, POST, PUT, DELETE).
//+ Supports Automatic Model Binding
//+ Supports JSON Serialization
//+ Maps HTTP verbs to methods

//+ we need to inherit the controller from the ApiController
//+ create a new .net web project and select as API and create. in web.config file, we can see the system.webserver which is necessary for web API. copy it and paste it to previous project and then install a package called Microsoft.AspNet.WebApi
//+ from application_start method copy GlobalConfiguration.Configure to the old project. copy WebApiConfig class as well. we need to create a controller for API. 
//+ BrandsController : ApiController will be created. create a method to return the data. we can use post man to test the web api. create a new get request, create a new collection and specify the collection name and create acollection. then take the url/api/nameofthecontroller
//+ GlobalConfiguration.Configure(WebApiConfig.Register); must be above RouteConfig.RegisterRoutes(RouteTable.Routes); in Application_Start method.
//+ sending request using ajax - we can remove the mvc code and write the ajax call in view. write the ajax call and get the data. url  is "/api/brands" here api is what we gave on the the route
$('.js-GetBrandsButton').click(() => {
    $.ajax({
        type: "Get", url: "/api/brands", success: (result) => {
            debugger;
            for (var i = 0; i < result.length; i++) {
                debugger;
                var br = result[i];
                var str = "<tr><td>" + br.BrandID + "</td><td>" + br.BrandName + "</td></tr>";
                $(".brandtable").append(str);
            }
        }, error: (err) => { alert.log(err); }
    })
});

//+ When we send a get request, we should give the method name starts with get.

//!! Learn rest of API s