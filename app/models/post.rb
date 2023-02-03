# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  body        :text
#  content_url :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  author_id   :bigint
#
class Post < ApplicationRecord
  validates :author_id, :title, presence: true
  #i think i have to add the author_id validation on a migration :/

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User
  has_many :likes, dependent: :destroy
  
  has_one_attached :photo #this is very similar to making new column

end
