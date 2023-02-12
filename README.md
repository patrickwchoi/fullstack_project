# Tumble

https://tumble-c367.onrender.com

## Background

Tumble is a full stack clone of the Tumblr, a social media site. It was built with a Ruby on Rails backend, a PostgreSQL database, and a JavaScript React/Redux frontend. Tumble has full CRUD functionality for posts and comments and partial CRUD for users and likes.

## Technologies Used

  * Backend: Ruby on Rails
  * Database: PostgreSQL
  * Frontend: JS React/Redux, CSS3 and HTML5
  * AWS for image storage

## Features

### Posts
Posts come with a title, optional body of text, and an optional image to attach. Posts are viewable through the main feed, or by visiting a user's profile where you can find their posts. Comes with full CRUD.

https://user-images.githubusercontent.com/98565804/218302224-4e082150-b183-4b1b-8ca4-ab394d796eef.mp4

### User Profile

After signing up, users can edit their username, bio, profile picture, and background picture.

### Likes
Users can like other posts. Users can delete their likes.

### Comments
Comments come with just a body of text. Comments can be made on yours and others posts. Comes with full CRUD
https://user-images.githubusercontent.com/98565804/218302292-9785939b-cd9c-4bf7-ba69-ee1836d26446.mp4

### Significant Code

#### Post Create
![image](https://user-images.githubusercontent.com/98565804/218302388-595c3152-7c87-4093-8d11-25f59f66906b.png)
Here, I am creating a form to send to my backend which contains my post's information and a photo file

#### index.json.jbuilder for posts
![image](https://user-images.githubusercontent.com/98565804/218039372-846cce99-ee27-43f4-b196-f152cabc0924.png)

Here, I am bringing to my middleware the post content along with its associated likes and comments whenever I use the index route from my backend

#### 
