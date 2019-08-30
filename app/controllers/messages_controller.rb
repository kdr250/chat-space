class MessagesController < ApplicationController
  def index
    @groups = current_user.groups
  end
  
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @group = Group.find(params[:group_id])
    # @groups = current_user.groups.includes(:messages)
    # @message = Message.new
  end

  def create
    @message = @group.messages.new(params_message)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      # flash.now[:alert] = 'メッセージを入力してください。'
      # render :index
      redirect_to group_messages_path(@group), alert: 'メッセージを入力してください。'
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