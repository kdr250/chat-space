FactoryBot.define do

  factory :group do
    name {Faker::Team.name}
    # name    {"testgroup"}
    # user
  end

end