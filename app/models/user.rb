# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  bio             :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :session_token, presence: true, uniqueness: true 
  validates :username, length: {minimum:3, maximum:30}, format: { without: URI::MailTo::EMAIL_REGEXP, message: "Can't be an email" }, uniqueness: true 
  validates :email, length: {minimum:5, maximum:255}, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true 

  before_validation :ensure_session_token 

  has_many :posts,
    foreign_key: :author_id,
    class_name: :Post

  has_many :likes, dependent: :destroy

  has_one_attached :profile_pic#, default_url: 'https://tumblrfullstackproject-seeds.s3.us-west-1.amazonaws.com/default_profile_pic.png'
  #will need to replace with profile pic
  has_one_attached :background_pic
    
  def self.find_by_credentials(credential, password)
    if credential.include?('@') 
      user = User.find_by(email: credential )
      return user if user && user.authenticate(password)

    else 
      user = User.find_by(username: credential )
      return user if user && user.authenticate(password)
    end 
    nil 
  end 

  def reset_session_token! 
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end 

  private 

  def ensure_session_token 
    self.session_token ||= generate_unique_session_token
  end 

  def generate_unique_session_token
     
    while true 
      token = SecureRandom::urlsafe_base64 
      return token unless User.exists?(session_token: token)
    end 
    
  end 
end
