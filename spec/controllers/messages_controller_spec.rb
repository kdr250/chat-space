require 'rails_helper'

# テストのポイント
# example１つにつき、結果を一つだけ期待している
# どのテストも明示的である
# 期待できる値が返ってくるときと、そうでないときを両方テストする
# FactoryBotを上手く利用して、すっきりとまとめる
# Fakerでダミーデータを作成する
# テスト内で使用する変数は、インスタンス変数として定義するのではなく、letを使用する

describe MessagesController do
  # 今回のテストで必要なインスタンスを生成する記述を行います。
  # 今回のように、複数のexampleで同一のインスタンスを使いたい場合、letメソッドを利用することができます。
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    # ログインをしているかどうかを条件に、contextを用いてテストをグループ分けをする。
    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      # この中にログインしている場合のテストを記述
      # deviseを用いて「ログインをする」ためのloginメソッドは、前項で定義したものです。
      # インスタンス変数に代入されたオブジェクトは、コントローラのassigns メソッド経由で参照できます。
      # @messageを参照したい場合、assigns(:message)と記述することができます。
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      # @groupはeqマッチャを利用してassigns(:group)とgroupが同一であることを確かめることでテストできます。
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      # 該当するビューが描画されているかどうかをテスト
      # expectの引数にresponseを渡しています。responseは、example内でリクエストが行われた後の遷移先のビューの情報を持つインスタンスです。
      # render_templateマッチャは引数にアクション名を取り、引数で指定されたアクションがリクエストされた時に自動的に遷移するビューを返します。
      it 'redners index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end





# describe MessagesController do

# # indexアクション

#   describe 'GET #index' do
#     it "populates an array of tweets ordered by created_at DESC" do
#       tweets = create_list(:tweet, 3)
#       get :index
#       expect(assigns(:tweets)).to match(tweets.sort{|a, b| b.created_at <=> a.created_at })
#     end

#     it "renders the :index template" do
#       get :index
#       expect(response).to render_template :index
#     end
# end