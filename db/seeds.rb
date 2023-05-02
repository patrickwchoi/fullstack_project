# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

# ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Like.destroy_all
  Comment.destroy_all
  Post.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('posts')
  ApplicationRecord.connection.reset_pk_sequence!('likes')
  ApplicationRecord.connection.reset_pk_sequence!('comments')


  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  walter = User.create!(
    username: 'walter_white', email: 'bb@gmail.com', password: 'password', bio: 'Say my name')
  walter.profile_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/heisenberg.png"), filename: "heisenberg.png")
  walter.background_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/breaking_bad_background.jpg"), filename: "default_backgrund_img.jpg")
  
  jesse = User.create!(
    username: 'jesse_pinkman', email: 'hellokitty@gmail.com', password: 'password', bio: 'whats up, b***h?'
  )
  jesse.profile_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/jesse_jane.jpg"), filename: 'jesse_jane.jpg')
  jesse.background_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/power_background.jpg"), filename: 'power_background.jpg')

  saul = User.create!(
    username: 'saul_goodman', email: 'bettercallsaul@gmail.com', password: 'password', bio: 'Cetter Call Saul!'
  )
  saul.profile_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/saul_face.png"), filename: 'saul_face.jpg')
  saul.background_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/saul_background.jpg"), filename: 'saul_background.jpg')

  cats = User.create!(
    username: 'cat_pictures', email: 'cataccound@gmail.com', password: 'password', bio: 'We love cats'
  )
  cats.profile_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/riley_cute.jpg"), filename: 'riley_cute.jpg')
  cats.background_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/cats_backgrouond.jpg"), filename: 'cats_backgrouond.jpg')

  gus = User.create!(
    username: 'mr.gus', email: 'lospollos@gmail.com', password: 'password', bio: 'Owner of Los Pollos Hermanos'
  )
  gus.profile_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/gus_smile.jpg"), filename: 'gus_smile.jpg')
  gus.background_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/gus_mad.jpg"), filename: 'gus_mad.jpg')

  twitter_art = User.create!(
    username: 'twitter_art', email: 'ttart@gmail.com', password: 'password', bio: 'Sharing art found on twitter'
  )
  twitter_art.profile_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/kobeni.jpg"), filename: 'kobeni.jpg')
  twitter_art.background_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/makima_post.jpg"), filename: 'makima_post.jpg')

  nature_photos = User.create!(
    username: 'nature_photos', email: 'nature@gmail.com', password: 'password', bio: 'Sharing nature photos'
  )
  # nature_photos.profile_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/nature.jpg"), filename: 'nature.jpg')
  # nature_photos.background_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/nature_background.jpg"), filename: 'nature_background.jpg')

  Post.create!(
    author_id: 6, title: 'power!', body: '@kimnenemMM_art'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/power_art.jpg'), filename: 'power_art.jpg')
  
  Post.create!(
    author_id: 1, title: 'Chemistry', body: "Walter White here, sharing my love for chemistry! 😄 As a high school teacher, it's a joy to ignite curiosity in students. Chemistry unravels the mysteries of life at the molecular level, and it's truly mesmerizing. 🔬🧪 #ChemistryRocks #ScienceIsLife"
  )
  Post.create!(
    author_id: 4, title: 'handsome'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/riley.jpg'), filename: 'riley.jpg')
  
  Post.create!(
    author_id: 6, title: 'yu-gi-oh', body: '@ManaMoonArt'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/dark_magicians_art.jpg'), filename: 'dark_magicians_art.jpg')

  Post.create!(
    author_id: 6, title: 'Part 7', body: "@Neg_50asu"
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/johny_gyro.jpg'), filename: 'johny_gyro.jpg')

  Post.create!(
    author_id: 2, title: 'Yo Yo Yo', body: "What's up Mr.White"
  )
  Post.create!(
    author_id: 2, title: 'Mr.White'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/mrwhite_whatrwe.jpg'), filename: 'mrwhite_whatrwe.jpg')
    
  Post.create!(
    author_id: 1, title: 'Does anyone recognize this compound?'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/meth_compound.jpg'), filename: 'meth_compound.jpg')

  Post.create!(
    author_id: 3, title: 'Pose'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/saul_makima.jpg'), filename: 'saul_makima.jpg')
   
  Post.create!(
    author_id: 4, title: 'Riley :3'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/riley_naenae.jpg'), filename: 'riley_naenae.jpg')
  
  Post.create!(
    author_id: 5, title: 'Welcome to Los Pollos Hermanos'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/welcome_los_pollos_hermanos.jpg'), filename: 'lospollos.jpg')

  Post.create!(
    author_id: 7, title: 'Squirrel', 
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/nature_squirrel.jpg'), filename: 'squirrel.jpg')

  Post.create!(
    author_id: 7, title: 'Sunflowers', 
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/nature_sunflower.jpg'), filename: 'sunflower.jpg')

  
  Like.create!({user_id: 1, post_id:1})
  Like.create!({user_id: 1, post_id:2})
  Like.create!({user_id: 2, post_id:3})
  Like.create!({user_id: 2, post_id:5})
  Like.create!({user_id: 3, post_id:3})

  Comment.create!({user_id: 1, post_id: 1, body: 'I love this'})
  Comment.create!({user_id: 2, post_id: 1, body: 'great art'})
  Comment.create!({user_id: 1, post_id: 2, body: 'Fantastic'})
  Comment.create!({user_id: 1, post_id: 3, body: 'Fantastic'})
  Comment.create!({user_id: 1, post_id: 4, body: 'Fantastic'})
  Comment.create!({user_id: 1, post_id: 5, body: 'Fantastic'})
  Comment.create!({user_id: 2, post_id: 5, body: 'wow'})
  Comment.create!({user_id: 2, post_id: 3, body: 'crazy'})



  puts "Done!"
# end