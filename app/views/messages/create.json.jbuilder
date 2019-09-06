json.(@message, :text, :image)
json.created_at @message.created_at
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id




# json.(@message, :text, :image)
# json.created_at @message.created_at
# json.user_name @message.user.name
# #idもデータとして渡す
# json.id @message.id

# json.text @message.text
# json.image @message.image
# json.created_at @message.created_at
# json.user_name @message.user.name
