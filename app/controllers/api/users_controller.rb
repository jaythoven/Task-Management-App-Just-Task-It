class Api::UsersController < ApplicationController
    skip_before_action :is_authenticated, only: [:create]

    def index
        users = User.all
        render json: users
    end

    def show 
        if @current_user
            render json: current_user, status: :ok
        else 
            render json: "Not authenticated", status: :unauthorized
        end 
    end

    def create 
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created 
        else 
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity 
        end 
    end

    def update
        user = @current_user
        user.update!(user_patch_params)
        render json: user, status: :accepted
    end

    def destroy
        @current_user.destroy 
        head :no_content
    end

    private 

    def user_params 
        params.permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
    end

    def user_patch_params
        params.permit(:first_name, :last_name, :username, :email, :password)
    end


end