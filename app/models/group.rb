class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  # accepts_nested_attributes_for :users
  has_many :messages

  validates :name, presence: true, uniqueness: true

  def show_last_text
    if (last_message = messages.last).present?
      last_message.text? ? last_message.text : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end

end
