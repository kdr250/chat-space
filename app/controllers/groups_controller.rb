class GroupsController < ApplicationController

  before_action :set_group, only: [:edit, :update]

  def index
    @groups = current_user.groups
  end

  def new
    @group = Group.new
    @group.users << current_user
    @users = User.where('name LIKE(?)', "%#{show_params[:keyword]}%").limit(5)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    # binding.pry
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました' 
    #   respond_to do |format|
    #     format.html( redirect_to root_path, notice: 'グループを作成しました' )
    #     format.json
    #   end
    else
      render :new
    end
    # keyword
    # [1] pry(#<UsersController>)> params
    # => <ActionController::Parameters {"keyword"=>"1", "controller"=>"users", "action"=>"index"} permitted: false>
    
    # params
    # [1] pry(#<GroupsController>)> params
    # => <ActionController::Parameters {"utf8"=>"✓", "_method"=>"patch", "authenticity_token"=>"eQhrko2YJXhw8/Nm2f4cP3HgG9krSaTuSHPNmLDS2TdGMcI0Iam5A39QVDTpoO/0nIhkzWPamn5hQpCfGbJXNA==", "group"=>{"name"=>"test4 Updated3", "user_ids"=>["1"]}, "commit"=>"Save", "controller"=>"groups", "action"=>"update", "id"=>"3"} permitted: false>
  end

  def edit
  end

  def update
    group = Group.find(params[:id])
    if group.update(group_params)
      redirect_to group_messages_path(params[:id]), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
    # params.require(:group).permit(:name, :user_ids)
  end

  def set_group
    @group = Group.find(params[:id])
  end

  def show_params
    params.permit(:keyword)
  end

end
