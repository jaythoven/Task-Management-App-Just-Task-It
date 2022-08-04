class Api::UsertasksController < ApplicationController

    def index
        usertasks = Usertask.all
        render json: usertasks
    end
    
    def create 
        usertask = Usertask.create(usertask_params)
        if usertask.valid?
            session[:usertask_id] = usertask.id
            render json: usertask, status: :created 
        else 
            render json: { errors: usertask.errors.full_messages }, status: :unprocessable_entity 
        end 
    end

    private 

    def usertask_params 
        params.permit(:user_id, :task_id)
    end

end