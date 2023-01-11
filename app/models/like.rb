# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  post_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Like < ApplicationRecord
  validates :user_id, :post_id, presence: true
  validates :user_id, uniqueness: { scope: :post_id }
  
  belongs_to :user, dependent: :destroy
  belongs_to :post, dependent: :destroy

end
