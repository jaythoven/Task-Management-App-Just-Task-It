class Api::SubtasksController < ApplicationController

    def index
        subtasks = current_user.subtasks
        render json: subtasks
    end

    def show
        subtask = Subtask.find(params[:id])
        render json: subtask
    end

    def create
        subtask = Subtask.create(subtask_params)
        if subtask.valid?
            render json: subtask, status: :created 
        else 
            render json: subtask.errors.full_messages, status: :unprocessable_entity 
        end 
    end

    def update
        subtask = Subtask.find_by(id: params[:id])
        if subtask.valid?
            subtask.update(subtask_params)
            render json: subtask, status: :ok
        else  
            render json: { errors: ["Task does not exist"]}, status: :not_found 
        end
    end

    def destroy 
        subtask = Subtask.find_by(id: params[:id])
        if subtask 
            subtask.destroy
            head :no_content 
        else  
            render json: "Subtask does not exist", status: :not_found 
        end
    end

    private 

    def subtask_params
        params.permit(:name, :completed, :user_id, :task_id)
    end

end