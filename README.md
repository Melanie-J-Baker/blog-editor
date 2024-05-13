# blog-editor

Frontend component of a Blog created using JavaScript, Express, MongoDB/Mongoose, passport JWTs, and bcrypt as part of the Odin Project curriculum: https://www.theodinproject.com/lessons/nodejs-blog-api

Try it here: https://melanie-j-baker.github.io/blog-editor/

To see blog-api: https://github.com/Melanie-J-Baker/blog-api To see blog-editor: https://github.com/Melanie-J-Baker/blog-editor

An API only backend with two different front-ends for accessing and editing blog posts. One of the front-end sites is to read and comment on posts, while the other one is used to write, edit and publish posts. Routes and controllers are set up following RESTful organization practices, and routes are protected using passport JWT (JSONwebtoken) authentication.

Posts are retrieved (using fetch) from the correct API endpoint and the results displayed on blog created using vanilla JavaScript.
A button can be pressed to  publish/unpublish posts. User has the ability to manage comments (i.e. delete and edit them).
