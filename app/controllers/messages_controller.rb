class MessagesController < ApplicationController

  def index
    @groups = current_user.groups
  end

  def create
    Message.create(params_message)
  end

  private
  def params_message
    params.require(:message).permit(:text, :image).merge(group_id: params[:group_id], user_id: current_user.id)
  end

end
