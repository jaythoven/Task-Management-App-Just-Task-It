class Api::TasksController < ApplicationController

    # skip_before_action :create

    def index
        tasks = current_user.tasks
        render json: tasks
    end

    def show 
        task = Task.find(params[:id])
        render json: task
    end

    # def completed
    #     task = current_user.tasks.find_by(completed: true)
    #     render json: task
    # end

    def create 
        task = Task.create(task_params)
        if task.valid?
            render json: task, status: :created 
        else 
            render json: task.errors.full_messages, status: :unprocessable_entity 
        end 
    end

    def update
        task = Task.find_by(id: params[:id])
        if task 
            task.update(task_params)
            render json: task
        else  
            render json: { errors: ["Task does not exist"]}, status: :not_found 
        end
    end

    def destroy 
        task = Task.find(params[:id])
        if task 
            task.destroy
            head :no_content 
        else  
            render json: { errors: ["Task does not exist"]}, status: :not_found 
        end
    end

    private 

    def task_params
        params.permit(:name, :completed)
    end

end