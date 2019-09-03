class MessagesController < ApplicationController
  
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(params_message)
    respond_to do |format|
      if @message.save
        format.html { redirect_to group_messages_path(params[:group_id]) }
        format.json
      end
    end
  end

  private
  def params_message
    params.require(:message).permit(:text, :image).merge(group_id: params[:group_id], user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
