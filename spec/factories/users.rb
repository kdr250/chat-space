FactoryBot.define do

  factory :user do
    password = Faker::Internet.password(min_length: 8)
    name {Faker::Name.last_name}
    email {Faker::Internet.free_email}
    password {password}
    password_confirmation {password}
  end

end

# FactoryBot.define do

#   factory :user do
#     nickname    {"abe"}
#     # email   {"kkk@gmail.com"}
#     password    {"00000000"}
#     password_confirmation   {"00000000"}
#     sequence(:email) {Faker::Internet.email}
#     # sequence(:email) { |n| "email#{n}@example.com" }
#   end

# end