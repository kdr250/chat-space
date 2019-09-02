FactoryBot.define do
  factory :message do
    text {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test.jpg")}
    user
    group
  end
end



# FactoryBot.define do
#   factory :tweet do
#     text {"hello!"}
#     image {"hoge.png"}
#     created_at { Faker::Time.between(from: DateTime.now - 2, to: DateTime.now) }
#     user
#   end
# end