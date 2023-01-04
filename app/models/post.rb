# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  title       :string
#  body        :text             not null
#  content_url :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  author_id   :bigint
#
class Post < ApplicationRecord
  validates :body, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  
end
