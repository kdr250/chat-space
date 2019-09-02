require 'rails_helper'

describe Message do

  describe '#create' do

    # メッセージを保存できる場合
    # メッセージがあれば保存できる <= 画像がなくても保存できる
    it "is valid without image" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end

    # 画像があれば保存できる <= メッセージがなくても保存できる
    it "is valid without text" do
      message = build(:message, text: nil)
      expect(message).to be_valid
    end

    # メッセージと画像があれば保存できる
    it "is valid with all" do
      message = build(:message)
      expect(message).to be_valid
    end

    # メッセージを保存できない場合
    # メッセージも画像も無いと保存できない
    # it "is invalid without a password_confirmation although with a password" do
    #   message = build(:message, text: nil, image: nil)
    #   message.valid?
    #   expect(message.errors[:text]).to include("can't be blank")
    #   expect(message.errors[:image]).to include("can't be blank")
    # end

    # メッセージも画像も無いと保存できない
    it 'is invalid without content and image' do
      message = build(:message, text: nil, image: nil)
      message.valid?
      expect(message.errors[:text]).to include('を入力してください')
    end

    # group_idが無いと保存できない
    it 'is invalid without group_id' do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include('を入力してください')
    end

    # user_idが無いと保存できない
    it 'is invalid without user_id' do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include('を入力してください')
    end

  end
end


# describe User do

#   describe '#create' do

#     it "is valid with a name, email, password, password_confirmation" do
#       user = build(:user)
#       expect(user).to be_valid
#     end

#     it "is invalid without a name" do
#       user = build(:user, name: nil)
#       user.valid?
#       expect(user.errors[:name]).to include("can't be blank")
#     end

#     it "is invalid without a email" do
#       user = build(:user, email: nil)
#       user.valid?
#       expect(user.errors[:email]).to include("can't be blank")
#     end

#     it "is invalid without a password" do
#       user = build(:user, password: nil)
#       user.valid?
#       expect(user.errors[:password]).to include("can't be blank")
#     end

#     it "is invalid without a password_confirmation although with a password" do
#       user = build(:user, password_confirmation: "")
#       user.valid?
#       expect(user.errors[:password_confirmation]).to include("doesn't match Password")
#     end

#     it "is invalid with a duplicate email address" do
#       user = create(:user)
#       another_user = build(:user, email: user.email)
#       another_user.valid?
#       expect(another_user.errors[:email]).to include("has already been taken")
#     end

#     it "is invalid with a name that has more than 7 characters " do
#       user = build(:user, name: "aaaaaaaa")
#       user.valid?
#       expect(user.errors[:name][0]).to include("is too long")
#     end

#     it "is valid with a name that has less than 6 characters " do
#       user = build(:user, name: "aaaaaa")
#       expect(user).to be_valid
#     end

#     it "is invalid with a password that has less than 5 characters " do
#       user = build(:user, password: "00000", password_confirmation: "00000")
#       user.valid?
#       expect(user.errors[:password][0]).to include("is too short")
#     end
#   end
# end
