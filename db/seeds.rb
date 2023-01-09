# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "open-uri"

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Post.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('posts')


  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  walter = User.create!(
    username: 'walter_white', email: 'bb@gmail.com', password: 'password', bio: 'I am the one who knocks!')
  walter.profile_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/heisenberg.png"), filename: "heisenberg.png")
  walter.background_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/default_backgrund_img.jpg"), filename: "default_backgrund_img.jpg")
  
  jesse = User.create!(
    username: 'jesse_pinkman', email: 'hellokitty@gmail.com', password: 'password', bio: 'whats up, b***h?'
  )
  jesse.profile_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/jesse_jane.jpg"), filename: 'jesse_jane.jpg')
  jesse.background_pic.attach(io: URI.open("https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/power_background.jpg"), filename: 'power_background.jpg')

  Post.create!(
    author_id: 1, title: 'How to Cook', body: 'Grab Jesse and Cook!'
  )
  Post.create!(
    author_id: 2, title: 'I love my friends', body: 'Yo Mr. White, I love you'
  )
  Post.create!(
    author_id: 2, title: 'Been having thoughts lately...', body: 'not null'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/mrwhite_whatrwe.jpg'), filename: 'mrwhite_whatrwe.jpg')
    
  Post.create!(
    author_id: 1, title: 'Loser Alert ROFL', body: 'not null'
  ).photo.attach(io: URI.open('https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/ted_loser.jpg'), filename: 'ted_loser.jpg')

  
  # More users
  5.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Done!"
end